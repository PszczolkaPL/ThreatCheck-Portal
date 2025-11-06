import React from "react";
import styles from "./UstawieniaBlock.module.css";

const UstawieniaBlock: React.FC = () => {
  return (
    <div className={styles.settingsContainer}>
      <h2 className={styles.title}>Ustawienia użytkownika</h2>

      <section className={styles.settingSection}>
        <h3>Profil</h3>
        <div className={styles.settingItem}>
          <label htmlFor="username">Nazwa użytkownika:</label>
          <input type="text" id="username" placeholder="Wprowadź nazwę użytkownika" />
          <button className={styles.saveButton}>Zapisz</button>
        </div>
        <div className={styles.settingItem}>
          <label htmlFor="profilePic">Zdjęcie profilowe:</label>
          <input type="file" id="profilePic" accept="image/*" />
          <button className={styles.saveButton}>Zmień</button>
        </div>
      </section>

      <section className={styles.settingSection}>
        <h3>Bezpieczeństwo</h3>
        <div className={styles.settingItem}>
          <label htmlFor="oldPassword">Stare hasło:</label>
          <input type="password" id="oldPassword" placeholder="Wprowadź stare hasło" />
        </div>
        <div className={styles.settingItem}>
          <label htmlFor="newPassword">Nowe hasło:</label>
          <input type="password" id="newPassword" placeholder="Wprowadź nowe hasło" />
        </div>
        <div className={styles.settingItem}>
          <label htmlFor="confirmPassword">Potwierdź hasło:</label>
          <input type="password" id="confirmPassword" placeholder="Potwierdź nowe hasło" />
          <button className={styles.saveButton}>Zmień hasło</button>
        </div>
      </section>

      <section className={styles.settingSection}>
        <h3>Dane</h3>
        <div className={styles.settingItem}>
          <button className={styles.dangerButton}>Wyczyść wszystkie dane</button>
        </div>
      </section>

      <section className={styles.settingSection}>
        <h3>Powiadomienia</h3>
        <div className={styles.settingItem}>
          <label htmlFor="notifications">Włącz powiadomienia:</label>
          <input type="checkbox" id="notifications" />
        </div>
      </section>

      <section className={styles.settingSection}>
        <h3>Konto</h3>
        <div className={styles.settingItem}>
          <button className={styles.logoutButton}>Wyloguj</button>
        </div>
      </section>
    </div>
  );
};

export default UstawieniaBlock;
