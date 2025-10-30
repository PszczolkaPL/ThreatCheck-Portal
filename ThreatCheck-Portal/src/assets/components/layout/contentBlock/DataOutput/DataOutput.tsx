import React from 'react';
import styles from './DataOutput.module.css';

interface DataOutputProps {
  data: any;
}

const syntaxHighlight = (json: string): string => {
    return json
      .replace(/("(.*?)")(?=:)/g, `<span style='color:#80cbc4'>$1</span>`) // keys (teal)
      .replace(/("(.*?)")/g, `<span style='color:#c792ea'>$1</span>`) // strings (lavender)
      .replace(/\b(true|false)\b/g, `<span style='color:#ffcb6b'>$1</span>`) // booleans (soft yellow)
      .replace(/\b(null)\b/g, `<span style='color:#b0bec5; font-style:italic'>$1</span>`) // null (gray)
      .replace(/\b(\d+(\.\d+)?)\b/g, `<span style='color:#f78c6c'>$1</span>`); // numbers (salmon)
  };
  
  

const DataOutput: React.FC<DataOutputProps> = ({ data }) => {
  const formatted = JSON.stringify(data, null, 2);
  const highlighted = syntaxHighlight(formatted);

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Wynik</h3>
      <pre
        className={styles.codeBlock}
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </div>
  );
};

export default DataOutput;
