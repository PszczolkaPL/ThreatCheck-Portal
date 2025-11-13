import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";

const navItems = [
  { label: "Sprawdzanie", path: "/sprawdzanie" },
  { label: "Eksport", path: "/eksport" },
  // { label: "Wynik", path: "/wynik" },
  { label: "Konfiguracja", path: "/konfiguracja" },
];

const NavBar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      {navItems.map((item) => (
        <Link
          key={item.label}
          to={item.path}
          className={`${styles.navItem} ${
            location.pathname === item.path ? styles.active : ""
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavBar;
