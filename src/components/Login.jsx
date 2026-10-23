import { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!email.trim()) nextErrors.email = "Email cannot be empty.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      nextErrors.email = "Enter a valid email address.";
    if (!password) nextErrors.password = "Password cannot be empty.";
    else if (password.length < 4)
      nextErrors.password = "Password must contain at least 4 characters.";
    if (Object.keys(nextErrors).length === 0) {
      if (email.trim() === "admin@campus.com" && password === "1234") {
        onLogin();
        return;
      }
      nextErrors.credentials =
        "Incorrect email or password. Try the demo credentials below.";
    }
    setErrors(nextErrors);
  }

  return (
    <main className="login-page">
      <section className="login-story">
        <div className="brand">
          <span className="brand-mark">c.</span> CampusConnect
        </div>
        <div className="story-content">
          <span className="eyebrow">
            A LITTLE MORE CAMPUS. A LOT MORE CONNECTION.
          </span>
          <h1>
            Great moments
            <br />
            start on campus<span>.</span>
          </h1>
          <p>
            One place for the workshops, competitions, and celebrations that
            bring your campus together.
          </p>
          <div className="campus-art" aria-hidden="true">
            <div className="art-sun" />
            <div className="art-roof" />
            <div className="art-building">
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="art-ground" />
          </div>
          <div className="story-footer">
            <span>LEARN. MEET. MAKE MEMORIES.</span>
            <span>↗</span>
          </div>
        </div>
        <small>Made for campus life.</small>
      </section>
      <section className="login-panel">
        <div className="login-form-wrap">
          <span className="eyebrow">YOUR CAMPUS, CONNECTED</span>
          <h2>Welcome back</h2>
          <p className="muted">College Event Management Portal</p>
          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              placeholder="you@campus.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="field-error">
                {errors.email}
              </p>
            )}
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password && (
              <p id="password-error" className="field-error">
                {errors.password}
              </p>
            )}
            {errors.credentials && (
              <p className="field-error" role="alert">
                {errors.credentials}
              </p>
            )}
            <button className="primary login-submit" type="submit">
              Login <span>↗</span>
            </button>
          </form>
          <div className="demo-box">
            <span className="demo-icon">i</span>
            <div>
              <strong>Take a look around</strong>
              <p>
                Demo email: <b>admin@campus.com</b>
                <br />
                Password: <b>1234</b>
              </p>
            </div>
          </div>
          <p className="login-note">
            A practical React project · Demo access only
          </p>
        </div>
      </section>
    </main>
  );
}
