import { useEffect, useState } from "react";
import { getProfile, getSession, subscribeProfile } from "../services/profileService";

export function useProfile() {
  const [profile, setProfile] = useState(getProfile);
  const [session, setSession] = useState(getSession);

  useEffect(() => {
    const unsubscribe = subscribeProfile(() => {
      setProfile({ ...getProfile() });
      setSession(getSession());
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return { profile, session };
}
