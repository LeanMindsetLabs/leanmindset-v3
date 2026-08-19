import { useState } from "react";
import { router } from "expo-router";
import ScrollableScreen from "@/src/layout/ScrollableScreen";
import { useProfile } from "@/src/hooks/useProfile";
import { logout } from "@/src/services/profileService";
import { colors } from "@/src/theme/colors";
import { profileRowDividerInset } from "@/src/ui/profile/iconSpec";
import ConfirmSheet from "@/src/ui/profile/ConfirmSheet";
import ProfileNavHeader from "@/src/ui/profile/ProfileNavHeader";
import SettingsGroup, { SettingsDivider } from "@/src/ui/profile/SettingsGroup";
import SettingsRow from "@/src/ui/profile/SettingsRow";
import { pushProfile } from "./nav";
import { openLegalPage } from "@/src/lib/legal";

export default function AccountScreen() {
  const { profile } = useProfile();
  const [confirmLogout, setConfirmLogout] = useState(false);

  return (
    <ScrollableScreen backgroundColor={colors.profileBlack}>
      <ProfileNavHeader title="My Account" onBack={() => router.back()} />

      <SettingsGroup title="Personal Information">
        <SettingsRow icon="user" label="Profile Information" value="Name, age, height" onPress={() => pushProfile("information")} />
        <SettingsDivider inset={profileRowDividerInset} />
        <SettingsRow icon="mail" label="Email" value={profile.user.email} onPress={() => pushProfile("information")} />
        <SettingsDivider inset={profileRowDividerInset} />
        <SettingsRow icon="lock" label="Password & Security" value="Login and 2FA" onPress={() => pushProfile("password")} />
      </SettingsGroup>

      <SettingsGroup title="Membership">
        <SettingsRow icon="crown" label="LeanMindset Plan" value={profile.membership.planName} onPress={() => pushProfile("membership")} />
        <SettingsDivider inset={profileRowDividerInset} />
        <SettingsRow icon="card" label="Payment & Billing" value="Card and invoices" onPress={() => pushProfile("billing")} />
      </SettingsGroup>

      <SettingsGroup title="Privacy">
        <SettingsRow icon="shield" label="Privacy & Data" value="How we use your data" onPress={() => pushProfile("privacy")} />
        <SettingsDivider inset={profileRowDividerInset} />
        <SettingsRow icon="download" label="Download My Data" value="Get a copy" onPress={() => pushProfile("export-data")} />
        <SettingsDivider inset={profileRowDividerInset} />
        <SettingsRow icon="trash" label="Delete Account" value="Remove this profile" destructive onPress={() => pushProfile("delete-account")} />
      </SettingsGroup>

      <SettingsGroup title="Support">
        <SettingsRow icon="help" label="Help & Support" value="FAQs and contact" onPress={() => pushProfile("help")} />
      </SettingsGroup>

      <SettingsGroup title="Legal">
        <SettingsRow icon="file" label="Terms & Conditions" value="Opens in browser" onPress={() => void openLegalPage("terms")} />
        <SettingsDivider inset={profileRowDividerInset} />
        <SettingsRow icon="shield" label="Privacy Policy" value="Opens in browser" onPress={() => void openLegalPage("privacy")} />
        <SettingsDivider inset={profileRowDividerInset} />
        <SettingsRow icon="people" label="Community Guidelines" value="Opens in browser" onPress={() => void openLegalPage("community")} />
      </SettingsGroup>

      <SettingsGroup>
        <SettingsRow icon="logout" label="Log Out" destructive showChevron={false} onPress={() => setConfirmLogout(true)} />
      </SettingsGroup>

      <ConfirmSheet
        visible={confirmLogout}
        title="Log out"
        body="This will clear your session and return you to sign in."
        confirmLabel="Log out"
        destructive
        onCancel={() => setConfirmLogout(false)}
        onConfirm={() => {
          logout();
          setConfirmLogout(false);
          router.replace("/login");
        }}
      />
    </ScrollableScreen>
  );
}
