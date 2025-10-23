import React from "react";
import styles from "./Konfiguracja.module.css";
import DataInput from "../../assets/components/layout/contentBlock/DataInput/DataInput";

const Konfiguracja: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <DataInput />
      </div>
    </div>
  );
};

export default Konfiguracja;
