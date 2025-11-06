import React, { useState } from 'react';
import styles from './DataInput.module.css';

interface DataInputProps {
  onCheck: (data: string[], dataType: string) => void;
}

const DataInput: React.FC<DataInputProps> = ({ onCheck }) => {
  const [dataType, setDataType] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleCheck = () => {
    const trimmed = textareaValue.trim();
    if (!dataType || !trimmed) return;

    const data = trimmed
      .split(/[\n,;]+/)
      .map(item => item.trim())
      .filter(item => item);

    onCheck(data, dataType);
  };

  const handleClear = () => {
    setDataType('');
    setTextareaValue('');
  };

  const handleFile = (file: File | null) => {
    if (!file) return;
    const allowedTypes = ['text/plain', 'application/json'];
    if (!allowedTypes.includes(file.type)) {
      setModalMessage('Nieprawidłowy format pliku. Akceptowane: TXT, JSON.');
      setShowModal(true);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      let data: string[] = [];
      try {
        if (file.type === 'application/json') {
          const parsed = JSON.parse(content);
          if (Array.isArray(parsed)) {
            data = parsed.map(item => String(item));
          } else {
            throw new Error('JSON musi być tablicą ciągów znaków.');
          }
        } else {
          data = content.split(/[\n,;]+/).map(item => item.trim()).filter(item => item);
        }
        setTextareaValue(data.join('\n'));
      } catch {
        setModalMessage('Błąd podczas przetwarzania pliku. Sprawdź format.');
        setShowModal(true);
      }
    };
    reader.readAsText(file);
  };

  return (
    <>
      <div className={styles.container}>
        <h4 className={styles.heading}>Wprowadzanie danych</h4>

        <h5 className={styles.subheading}>Typ danych</h5>
        <form className={styles.form}>
          <select
            id="dataType"
            className={styles.select}
            value={dataType}
            onChange={(e) => setDataType(e.target.value)}
          >
            <option value="">Wybierz typ danych do sprawdzenia</option>
            <option value="ip">IPs</option>
            <option value="domain">Domain</option>
            <option value="url">URLs</option>
            <option value="autodetect">Auto Detect</option>
          </select>
        </form>

        <h5 className={styles.subheading}>Prześlij plik</h5>
        <div className={styles.dropzoneWrapper}>
          <label
            htmlFor="dropzone-file"
            className={`${styles.dropzone} ${isDragOver ? styles.dragOver : ''}`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragOver(false);
              const files = e.dataTransfer.files;
              if (files.length > 0) {
                handleFile(files[0]);
              }
            }}
          >
            <div className={styles.dropzoneContent}>
              <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p><span className={styles.bold}>Kliknij by wybrać</span> albo przesuń plik tutaj</p>
              <p className={styles.fileHint}>TXT, JSON</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className={styles.hiddenInput}
              accept=".txt, .json"
              onChange={(e) => handleFile(e.target.files?.[0] || null)}
            />
          </label>
        </div>

        <h5 className={styles.subheading}>Wprowadź dane ręcznie</h5>
        <div className={styles.textareaWrapper}>
          <textarea
            id="message"
            rows={4}
            className={styles.textarea}
            placeholder="Dane muszą być oddzielone nowymi liniami, przecinkami lub średnikami."
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button type="button" className={styles.button}>Przetwórz dane</button>
          <button type="button" className={styles.button} onClick={handleCheck}>Sprawdź</button>
          <button type="button" className={styles.button} onClick={handleClear}>Wyczyść</button>
        </div>

        <div className={styles.alert} role="alert">
          <svg className={styles.alertIcon} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
          </svg>
          <div>
            Obsługiwane formaty: TXT, JSON. Dane muszą być oddzielone nowymi liniami, przecinkami lub średnikami.
          </div>
        </div>
      </div>

      {showModal && (
        <div className={styles.modalBackdrop} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h4>Błąd pliku</h4>
            <p>{modalMessage}</p>
            <button className={styles.modalButton} onClick={() => setShowModal(false)}>Zamknij</button>
          </div>
        </div>
      )}
    </>
  );
};

export default DataInput;
