import Avatar from "./Avatar";
import type { ProfileUser } from "../services/profileService";
import "../styles/profile.css";

type ProfileIdentityProps = {
  user: ProfileUser;
};

export default function ProfileIdentity({ user }: ProfileIdentityProps) {
  return (
    <section className="profile-identity">
      <Avatar letter={user.initial} online={user.online} size={48} label={user.name} />
      <div>
        <div className="profile-name">{user.name}</div>
        <div className="profile-email">{user.email}</div>
      </div>
    </section>
  );
}
