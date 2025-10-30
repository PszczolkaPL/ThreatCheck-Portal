import React from "react";
import styles from "./Sprawdzanie.module.css";
import DataInput from "../../assets/components/layout/contentBlock/DataInput/DataInput";

const Sprawdzanie: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <DataInput />
      </div>
    </div>
  );
};

export default Sprawdzanie;
