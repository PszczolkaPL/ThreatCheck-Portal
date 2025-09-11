import React from "react";
import styles from "./NavBar.module.css";

const navItems = [
    { label: "Sprawdzanie", href: "#" },
    { label: "Wynik", href: "#" },
    { label: "Eksport", href: "#" },
    { label: "Konfiguracja", href: "#" },
];

const NavBar: React.FC = () => (
        <nav className={styles.navbar}>
            {navItems.map((item) => (
                <a key={item.label} href={item.href} className={styles.navItem}>
                    {item.label}
                </a>
            ))}
        </nav>
    );

export default NavBar;