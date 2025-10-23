import React from "react";
import styles from "./Wynik.module.css";
import DataInput from "../../assets/components/layout/contentBlock/DataInput/DataInput";

const Wynik: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <DataInput />
        <DataInput />
      </div>
    </div>
  );
};

export default Wynik;
