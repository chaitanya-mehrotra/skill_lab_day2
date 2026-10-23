import { useEffect, useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true",
  );

  // Keep open tabs in sync when the user logs out in another tab.
  useEffect(() => {
    function checkLogin() {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    }
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  function login() {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  }

  function logout() {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  }

  return isLoggedIn ? (
    <Dashboard onLogout={logout} />
  ) : (
    <Login onLogin={login} />
  );
}
