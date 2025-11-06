import React, { useState } from "react";
import styles from "./Header.module.css";
import userpic from "./user.png";

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

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
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
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
            <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); closeModals(); }}>
              <label>Email:</label>
              <input type="email" placeholder="Wprowadź email" required />
              <label>Hasło:</label>
              <input type="password" placeholder="Wprowadź hasło" required />
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
            <form onSubmit={(e) => { e.preventDefault(); closeModals(); }}>
              <label>Email:</label>
              <input type="email" placeholder="Wprowadź email" required />
              <label>Hasło:</label>
              <input type="password" placeholder="Wprowadź hasło" required />
              <label>Potwierdź Hasło:</label>
              <input type="password" placeholder="Potwierdź hasło" required />
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
