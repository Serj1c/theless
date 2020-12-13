import React from 'react';
import { Logo } from './components/Logo/Logo';
import { Menu } from './components/Menu';
import { Login } from './components/Login/Login';
import styles from './Header.module.css';

interface Props {
  inverted?: boolean;
}

export const Header: React.FunctionComponent<Props> = ({ inverted }) => (
  <div className={styles.root}>
    <div className={styles.left}>
      <Menu inverted={inverted} />
    </div>
    <div className={styles.center}>
      <Logo inverted={inverted} />
    </div>
    <div className={styles.right}>
      <Login inverted={inverted} />
    </div>
  </div>
);
