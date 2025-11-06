import React from 'react';
import styles from './Funny.module.css';
import cat from './cat.png'

const DataInput: React.FC = () => {
  return (
    <div className={styles.container}>
        <h1>Coming soon...</h1>
        <img src={cat} alt="Kot" />
    </div>
  );
};

export default DataInput;
