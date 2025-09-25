import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    text: string;
    color?: string;
    textColor?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, color, textColor, icon, onClick }) => {
    return (
        <button
            className={styles.button}
            style={{ backgroundColor: color, color: textColor }}
            onClick={onClick}
        >
            {icon && <span className={styles.icon}>{icon}</span>}
            {text}
        </button>
    );
};

export default Button;