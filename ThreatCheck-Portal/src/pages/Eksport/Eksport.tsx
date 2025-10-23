import React from "react";
import styles from "./Eksport.module.css";
import Funny from "../../assets/components/layout/contentBlock/FunnyMonkeyPic/Funny";

const Eksport: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <Funny />
      </div>
    </div>
  );
};

export default Eksport;
