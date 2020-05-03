import React from 'react';
import styles from './FullWidthCol.module.css';

const FullWidthCol = ({ children }: React.PropsWithChildren<{}>) => {
    return <div className={styles.root}>{children}</div>
}

export default FullWidthCol;
