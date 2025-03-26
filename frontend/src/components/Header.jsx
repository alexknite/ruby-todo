import React from "react";

import styles from "../styles/Header.module.css";

export const Header = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.title}>
        <h2>Things To-Do</h2>
      </div>
    </nav>
  );
};
