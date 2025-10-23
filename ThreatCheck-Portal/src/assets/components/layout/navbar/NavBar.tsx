import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

const navItems = [
  { label: "Sprawdzanie", path: "/sprawdzanie" },
  { label: "Wynik", path: "/wynik" },
  { label: "Eksport", path: "/eksport" },
  { label: "Konfiguracja", path: "/konfiguracja" },
];

const NavBar: React.FC = () => (
  <nav className={styles.navbar}>
    {navItems.map((item) => (
      <Link key={item.label} to={item.path} className={styles.navItem}>
        {item.label}
      </Link>
    ))}
  </nav>
);

export default NavBar;
