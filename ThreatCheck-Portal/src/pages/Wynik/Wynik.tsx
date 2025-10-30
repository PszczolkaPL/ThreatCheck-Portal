import React from "react";
import styles from "./Wynik.module.css";
import Funny from "../../assets/components/layout/contentBlock/FunnyMonkeyPic/Funny";


const Wynik: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <Funny />
      </div>
    </div>
  );
};

export default Wynik;
