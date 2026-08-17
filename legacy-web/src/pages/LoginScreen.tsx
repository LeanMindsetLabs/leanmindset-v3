import { useState } from "react";
import { login } from "../services/profileService";
import "../styles/profile.css";

type LoginScreenProps = {
  onLoggedIn: () => void;
};

export default function LoginScreen({ onLoggedIn }: LoginScreenProps) {
  const [email, setEmail] = useState("mani.dev@gmail.com");

  function submit() {
    login(email);
    onLoggedIn();
  }

  return (
    <div className="login-screen">
      <h1>Lean Mindset</h1>
      <p>Sign in to continue your program, readiness, and progress.</p>
      <div className="subpage-field">
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <button type="button" className="login-cta" onClick={submit}>
        Continue
      </button>
    </div>
  );
}
