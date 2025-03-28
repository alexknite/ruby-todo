import React from "react";

import styles from '../../styles/Tag.module.css';

export const Tag = ({ name }) => {
  return <li className={styles.tag}>{name}</li>;
};
