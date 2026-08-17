import { useState } from "react";
import BottomNavigation from "./components/BottomNavigation";
import DeviceFrame from "./components/DeviceFrame";
import { MealsLogProvider } from "./context/MealsLogContext";
import { useProfile } from "./hooks/useProfile";
import AppSettingsScreen from "./pages/AppSettingsScreen";
import CoachScreen from "./pages/CoachScreen";
import DailyCheckInScreen, { type CoachUiVariant } from "./pages/DailyCheckInScreen";
import HelpSupportScreen from "./pages/HelpSupportScreen";
import HomeScreen from "./pages/HomeScreen";
import IntegrationsScreen from "./pages/IntegrationsScreen";
import LeanScoreScreen from "./pages/LeanScoreScreen";
import LoginScreen from "./pages/LoginScreen";
import MealsLogScreen, { type MealsUiVariant } from "./pages/MealsLogScreen";
import MealsScreen from "./pages/MealsScreen";
import MeasurementsScreen from "./pages/MeasurementsScreen";
import ProfileSettingsScreen from "./pages/ProfileSettingsScreen";
import ProgramScreen from "./pages/ProgramScreen";
import ProgressPhotosScreen from "./pages/ProgressPhotosScreen";
import ProgressSeeAllScreen from "./pages/ProgressSeeAllScreen";
import TodayReadinessScreen from "./pages/TodayReadinessScreen";
import TrainScreen from "./pages/TrainScreen";
import WeeklyReviewsListScreen from "./pages/WeeklyReviewsListScreen";
import WeekReviewScreen from "./pages/WeekReviewScreen";
import WeightDetailScreen from "./pages/WeightDetailScreen";
import type { ProgressView, TabId } from "./types";
import type { LayoutVariant } from "./pages/HomeScreen";

export default function App() {
  const { profile, session } = useProfile();
  const [tab, setTab] = useState<TabId>("home");
  const [prevTab, setPrevTab] = useState<TabId>("today");
  const [coachDraft, setCoachDraft] = useState<string | null>(null);
  const [trainWorkoutId, setTrainWorkoutId] = useState<string | null>(null);
  const [trainReturnTab, setTrainReturnTab] = useState<TabId>("progress");
  const [progressStack, setProgressStack] = useState<ProgressView[]>(["profile"]);
  const [weekReview, setWeekReview] = useState<number | null>(null);
  const [mealsVariant, setMealsVariant] = useState<MealsUiVariant>("classic");
  const [coachVariant, setCoachVariant] = useState<CoachUiVariant>("chat");
  const [layoutVariant, setLayoutVariant] = useState<LayoutVariant>("whoop");
  const progressView = progressStack[progressStack.length - 1];

  function handleComposerFocus(focused: boolean) {
    document.documentElement.classList.toggle("keyboard-open", focused);
  }

  function openWorkout(workoutId: string) {
    setTrainWorkoutId(workoutId);
    setTrainReturnTab("today");
    setTab("train");
  }

  function changeTab(id: TabId) {
    if (id === "train") setTrainReturnTab("progress");
    if (id === "progress" && tab === "progress") {
      setProgressStack(["profile"]);
      return;
    }
    if (id !== "progress") setProgressStack(["profile"]);
    if (id !== tab) setPrevTab(tab);
    setTab(id);
  }

  function openProgress(view: ProgressView) {
    setProgressStack((stack) => [...stack, view]);
  }

  function backProgress() {
    if (progressStack.length <= 1) {
      setTab(prevTab === "progress" ? "today" : prevTab);
      return;
    }
    setProgressStack((stack) => stack.slice(0, -1));
  }

  function renderProgress() {
    if (progressView === "lean-score") {
      return <LeanScoreScreen onBack={backProgress} />;
    }
    if (progressView === "weight") {
      return <WeightDetailScreen profile={profile} onBack={backProgress} />;
    }
    if (progressView === "see-all") {
      return <ProgressSeeAllScreen onBack={backProgress} onOpen={openProgress} />;
    }
    if (progressView === "program") {
      return <ProgramScreen program={profile.program} onBack={backProgress} />;
    }
    if (progressView === "measurements") {
      return <MeasurementsScreen profile={profile} onBack={backProgress} />;
    }
    if (progressView === "integrations") {
      return <IntegrationsScreen profile={profile} onBack={backProgress} />;
    }
    if (progressView === "settings") {
      return <AppSettingsScreen profile={profile} onBack={backProgress} />;
    }
    if (progressView === "help") {
      return <HelpSupportScreen onBack={backProgress} />;
    }
    if (progressView === "photos") {
      return <ProgressPhotosScreen onBack={backProgress} />;
    }
    if (progressView === "reviews") {
      return (
        <WeeklyReviewsListScreen
          onBack={backProgress}
          onOpenWeek={(week) => setWeekReview(week)}
        />
      );
    }
    return (
      <ProfileSettingsScreen
        profile={profile}
        onBack={backProgress}
        onOpen={openProgress}
      />
    );
  }

  return (
    <DeviceFrame>
      {!session ? (
        <LoginScreen onLoggedIn={() => setTab("progress")} />
      ) : weekReview != null ? (
        <WeekReviewScreen
          week={weekReview}
          onBack={() => setWeekReview(null)}
          onStartedNext={() => {
            setWeekReview(null);
            setTab("today");
            setProgressStack(["profile"]);
          }}
        />
      ) : (
        <MealsLogProvider>
          <div className="app-shell">
            {tab === "progress" && renderProgress()}
            {tab === "coach" &&
              (coachVariant === "checkin" ? (
                <DailyCheckInScreen
                  variant={coachVariant}
                  onVariantChange={setCoachVariant}
                  onOpenMealsLog={() => {
                    setMealsVariant("log");
                    setTab("meals");
                  }}
                />
              ) : (
                <CoachScreen
                  onComposerFocusChange={handleComposerFocus}
                  incomingMessage={coachDraft}
                  onIncomingHandled={() => setCoachDraft(null)}
                  coachVariant={coachVariant}
                  onCoachVariantChange={setCoachVariant}
                />
              ))}
            {tab === "meals" &&
              (mealsVariant === "log" ? (
                <MealsLogScreen
                  variant={mealsVariant}
                  onVariantChange={setMealsVariant}
                  onOpenCheckIn={() => {
                    setCoachVariant("checkin");
                    setTab("coach");
                  }}
                />
              ) : (
                <MealsScreen
                  onAskCoach={(message) => {
                    setCoachDraft(message);
                    setCoachVariant("chat");
                    setTab("coach");
                  }}
                  mealsVariant={mealsVariant}
                  onMealsVariantChange={setMealsVariant}
                />
              ))}
            {tab === "train" && (
              <TrainScreen
                onBack={() => setTab(trainReturnTab)}
                startWorkoutId={trainWorkoutId}
                onStartConsumed={() => setTrainWorkoutId(null)}
                variant={layoutVariant}
                onVariantChange={setLayoutVariant}
              />
            )}
            {tab === "home" && (
              <HomeScreen
                variant={layoutVariant}
                onVariantChange={setLayoutVariant}
                onContinue={() => setTab("today")}
                onOpenProgram={() => {
                  setProgressStack(["profile", "program"]);
                  setTab("progress");
                }}
                onOpenMeals={() => setTab("meals")}
                onOpenTrain={() => setTab("train")}
              />
            )}
            {tab === "today" && (
              <TodayReadinessScreen
                onBack={() => setTab("progress")}
                onOpenWorkout={openWorkout}
                onOpenMeals={() => setTab("meals")}
                onOpenWeekReview={(week) => setWeekReview(week)}
                variant={layoutVariant}
                onVariantChange={setLayoutVariant}
              />
            )}
            <BottomNavigation activeId={tab} onChange={changeTab} />
          </div>
        </MealsLogProvider>
      )}
    </DeviceFrame>
  );
}
