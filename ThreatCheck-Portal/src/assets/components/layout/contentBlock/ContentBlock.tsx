import React from 'react';
import styles from './ContentBlock.module.css';

interface ContentBlockProps {
    children: React.ReactNode;
    className?: string;
}

const ContentBlock: React.FC<ContentBlockProps> = ({ children, className }) => {
    return (
        <div className={`${styles.contentBlock} ${className || ''}`}>
            {children}
        </div>
    );
};

export default ContentBlock;