import React from "react";
import styles from "./Ustawienia.module.css";
import UstawieniaBlock from "../../assets/components/layout/contentBlock/Ustawienia/UstawieniaBlock";

const Ustawienia: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <UstawieniaBlock />
      </div>
    </div>
  );
};

export default Ustawienia;
