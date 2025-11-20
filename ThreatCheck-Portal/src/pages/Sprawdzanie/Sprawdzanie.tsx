import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Sprawdzanie.module.css";
import DataInput from "../../assets/components/layout/contentBlock/DataInput/DataInput";

const Sprawdzanie: React.FC = () => {
  const navigate = useNavigate();

  const handleCheck = async (data: string[], dataType: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/eksport', { state: { results: { error: 'Please log in to check data' } } });
      return;
    }
    try {
      const response = await fetch('http://localhost:8000/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ data, data_type: dataType })
      });
      const result = await response.json();
      navigate('/eksport', { state: { results: result } });
    } catch (error) {
      navigate('/eksport', { state: { results: { error: 'Failed to fetch data from backend' } } });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <DataInput onCheck={handleCheck} />
      </div>
    </div>
  );
};

export default Sprawdzanie;
