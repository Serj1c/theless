import React, { useCallback, useEffect } from 'react';
import { Logo } from 'components/common';
import styles from './AuthLayout.module.css';

export const AuthLayout: React.FunctionComponent = ({ children }) => {
  const handleResize = useCallback(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, []);

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <Logo />
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};
