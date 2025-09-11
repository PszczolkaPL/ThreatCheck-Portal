import { Link } from "react-router-dom";
import styles from "./Header.module.css";

interface HeaderProps {
  totalChecks?: number;
  dangerous?: number;
  suspicious?: number;
  safe?: number;
}

const Header: React.FC<HeaderProps> = ({ totalChecks = 0, dangerous = 0, suspicious = 0, safe = 0 }) => {
  return (
    <header className={styles.header}>

      <div className={styles.branding}>
        <div className={styles.logo}><h2>ThreatCheck Portal</h2></div>
        <div className={styles.spacer}>Portal do sprawdzania zagrożeń bezpieczeństwa</div>
      </div>
      

      <div className={styles.stats}>
        
        <div className={styles.stat}>
          <div className={`${styles.number} ${styles.totalChecks}`}>{totalChecks}</div>
          <div className={styles.label}>Sprawdzeń</div>
        </div>
        <div className={styles.stat}>
          <div className={`${styles.number} ${styles.dangerous}`}>{dangerous}</div>
          <div className={styles.label}>Zagrożeń</div>
        </div>
        <div className={styles.stat}>
          <div className={`${styles.number} ${styles.suspicious}`}>{suspicious}</div>
          <div className={styles.label}>Podejrzanych</div>
        </div>
        <div className={styles.stat}>
          <div className={`${styles.number} ${styles.safe}`}>{safe}</div>
          <div className={styles.label}>Bezpiecznych</div>
        </div>

      </div>
    </header>
  );
};

export default Header;
