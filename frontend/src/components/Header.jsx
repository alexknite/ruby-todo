import React from "react";

import styles from "../styles/Header.module.css";

export const Header = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.title}>
        <h2 className={styles.neonText}>Things ToDo</h2>
      </div>
    </nav>
  );
};
