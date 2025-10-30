import React from 'react';
import styles from './ExportOptions.module.css';

interface ExportProps {
  data: any;
}

const Export: React.FC<ExportProps> = ({ data }) => {
  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportJSON = () => {
    const jsonString = JSON.stringify(data, null, 2);
    downloadFile(jsonString, 'ThreatCheck-Portal-export.json', 'application/json');
  };

  const exportTXT = () => {
    const txtString = JSON.stringify(data, null, 2);
    downloadFile(txtString, 'ThreatCheck-Portal-export.txt', 'text/plain');
  };

  const exportCSV = () => {
    // Simple CSV conversion: flatten object to key-value pairs
    const flattenObject = (obj: any, prefix = ''): any => {
      let flattened: any = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const newKey = prefix ? `${prefix}.${key}` : key;
          if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            Object.assign(flattened, flattenObject(obj[key], newKey));
          } else {
            flattened[newKey] = Array.isArray(obj[key]) ? obj[key].join('; ') : obj[key];
          }
        }
      }
      return flattened;
    };

    const flattened = flattenObject(data);
    const headers = Object.keys(flattened);
    const values = headers.map(key => flattened[key]);
    const csvContent = [headers.join(','), values.join(',')].join('\n');
    downloadFile(csvContent, 'ThreatCheck-Portal-export.csv', 'text/csv');
  };

  return (
    <div className={styles.container}>
      <h4 className={styles.heading}>Eksport danych</h4>
      <h5 className={styles.subheading}>Wybierz format eksportu</h5>
      <div className={styles.buttonGroup}>
        <button className={styles.button} onClick={exportJSON}>
          <div className={styles.buttonContent}>
            <span className={styles.buttonText}>Eksportuj jako JSON</span>
            <span className={styles.buttonDesc}>Format strukturalny</span>
          </div>
        </button>
        <button className={styles.button} onClick={exportCSV}>
          <div className={styles.buttonContent}>
            <span className={styles.buttonText}>Eksportuj jako CSV</span>
            <span className={styles.buttonDesc}>Format tabelaryczny</span>
          </div>
        </button>
        <button className={styles.button} onClick={exportTXT}>
          <div className={styles.buttonContent}>
            <span className={styles.buttonText}>Eksportuj jako TXT</span>
            <span className={styles.buttonDesc}>Format tekstowy</span>
          </div>
        </button>
      </div>
      <div className={styles.alert} role="alert">
        <svg className={styles.alertIcon} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <div>
          Wybierz format eksportu danych. Plik zostanie automatycznie pobrany po kliknięciu.
        </div>
      </div>
    </div>
  );
};

export default Export;
