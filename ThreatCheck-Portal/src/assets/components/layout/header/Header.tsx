import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import userpic from "./user.png";

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const handleLogin = () => {
    setIsLoginModalOpen(true);
    setIsDropdownOpen(false);
  };
  const handleSignUp = () => {
    setIsSignUpModalOpen(true);
    setIsDropdownOpen(false);
  };
  const closeModals = () => {
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(false);
  };
  const switchToSignUp = () => {
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(true);
  };
  const switchToLogin = () => {
    setIsSignUpModalOpen(false);
    setIsLoginModalOpen(true);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.access_token);
        setIsLoggedIn(true);
        setIsLoginModalOpen(false);
        setLoginUsername("");
        setLoginPassword("");
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "Login failed");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (signupPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: signupUsername, password: signupPassword }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.access_token);
        setIsLoggedIn(true);
        setIsSignUpModalOpen(false);
        setSignupUsername("");
        setSignupPassword("");
        setConfirmPassword("");
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "Signup failed");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.branding}>
        <div className={styles.logo}><h2>ThreatCheck Portal</h2></div>
        <div className={styles.spacer}>Portal do sprawdzania zagrożeń bezpieczeństwa</div>
      </div>

      <div className={styles.profile}>
        <div className={styles.profilePic} onClick={toggleDropdown}>
          <img src={userpic} alt="Profile" />
        </div>

        {isDropdownOpen && (
          <div className={styles.dropdown}>
            {isLoggedIn ? (
              <>
                <button className={styles.dropdownItem}>Statystyki</button>
                <button className={styles.dropdownItem}>Ustawienia</button>
                <button className={`${styles.dropdownItem} ${styles.logout}`} onClick={handleLogout}>Wyloguj</button>
              </>
            ) : (
              <>
                <button className={`${styles.dropdownItem} ${styles.login}`} onClick={handleLogin}>Zaloguj</button>
                <button className={styles.dropdownItem} onClick={handleSignUp}>Zarejestruj</button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={closeModals}>×</button>
            <h2>Logowanie</h2>
            {error && <p className={styles.error}>{error}</p>}
            <form onSubmit={handleLoginSubmit}>
              <label>Nazwa użytkownika:</label>
              <input
                type="text"
                placeholder="Wprowadź nazwę użytkownika"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                required
              />
              <label>Hasło:</label>
              <input
                type="password"
                placeholder="Wprowadź hasło"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <div className={styles.buttonGroup}>
                <button type="submit">Zaloguj</button>
                <button type="button" onClick={closeModals}>Anuluj</button>
              </div>
            </form>
            <p>Nie masz konta?
              <button onClick={switchToSignUp}>Zarejestruj się</button>
            </p>
          </div>
        </div>
      )}

      {/* Sign-Up Modal */}
      {isSignUpModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={closeModals}>×</button>
            <h2>Rejestracja</h2>
            {error && <p className={styles.error}>{error}</p>}
            <form onSubmit={handleSignupSubmit}>
              <label>Nazwa użytkownika:</label>
              <input
                type="text"
                placeholder="Wprowadź nazwę użytkownika"
                value={signupUsername}
                onChange={(e) => setSignupUsername(e.target.value)}
                required
              />
              <label>Hasło:</label>
              <input
                type="password"
                placeholder="Wprowadź hasło"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
              />
              <label>Potwierdź Hasło:</label>
              <input
                type="password"
                placeholder="Potwierdź hasło"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <div className={styles.buttonGroup}>
                <button type="submit">Zarejestruj</button>
                <button type="button" onClick={closeModals}>Anuluj</button>
              </div>
            </form>
            <p>Masz już konto?
              <button onClick={switchToLogin}>Zaloguj się</button>
            </p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
