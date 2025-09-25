import React from 'react';
import styles from './Switch.module.css';

interface SwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange }) => {
    const handleToggle = () => {
        onChange(!checked);
    };

    return (
        <label className={styles.switch}>
            <input
                type="checkbox"
                checked={checked}
                onChange={handleToggle}
                className={styles.input}
            />
            <span className={styles.slider}></span>
        </label>
    );
};

export default Switch;