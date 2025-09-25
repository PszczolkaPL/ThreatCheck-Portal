import React, { useState } from 'react';
import styles from './List.module.css';

interface SelectProps {
    options: string[];
}

const SelectList: React.FC<SelectProps> = ({ options }) => {
    const [selectedOption, setSelectedOption] = useState<string>(options[0]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className={styles.container}>
            <select
                className={styles.select}
                value={selectedOption}
                onChange={handleChange}
            >
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectList;
