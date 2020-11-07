import React from 'react';
import styles from './FullWidthCol.module.css';

export const FullWidthCol: React.FunctionComponent = ({ children }) => (
  <div className={styles.root}>{children}</div>
);
