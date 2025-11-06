import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Eksport.module.css";
import DataOutput from "../../assets/components/layout/contentBlock/DataOutput/DataOutput";
import Export from "../../assets/components/layout/contentBlock/Export/ExportOptions";

const sampleData = {
  SampleResponse: {
    ipAddress: "118.25.6.39",
    isPublic: true,
    ipVersion: 4,
    isWhitelisted: false,
    abuseConfidenceScore: 100,
    countryCode: "CN",
    countryName: "China",
    usageType: "Data Center/Web Hosting/Transit",
    isp: "Tencent Cloud Computing (Beijing) Co. Ltd",
    domain: "tencent.com",
    hostnames: [],
    isTor: false,
    totalReports: 1,
    numDistinctUsers: 1,
    lastReportedAt: "2018-12-20T20:55:14+00:00",
    reports: [
      {
        reportedAt: "2018-12-20T20:55:14+00:00",
        comment:
          "Dec 20 20:55:14 srv206 sshd[13937]: Invalid user oracle from 118.25.6.39",
        categories: [18, 22],
        reporterId: 1,
        reporterCountryCode: "US",
        reporterCountryName: "United States",
      },
    ],
  },
};

const Eksport: React.FC = () => {
  const location = useLocation();
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('eksportData');
    return savedData ? JSON.parse(savedData) : (location.state?.results || sampleData);
  });

  useEffect(() => {
    const newData = location.state?.results;
    if (newData) {
      setData(newData);
    }
  }, [location.state?.results]);

  useEffect(() => {
    localStorage.setItem('eksportData', JSON.stringify(data));
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <Export data={data} />
        <DataOutput data={data} />
      </div>
    </div>
  );
};

export default Eksport;
