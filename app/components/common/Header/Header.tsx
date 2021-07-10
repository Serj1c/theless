import React from 'react';
import { Logo } from './components/Logo/Logo';
import { Menu } from './components/Menu/Menu';
import { Login } from './components/Login/Login';
import styles from './Header.module.css';

interface Props {
  inverted?: boolean;
}

export const Header = ({ inverted }: Props): JSX.Element => (
  <div className={styles.root}>
    <div className={styles.left}>
      <Menu />
    </div>
    <div className={styles.center}>
      <Logo inverted={inverted} />
    </div>
    <div className={styles.right}>
      <Login inverted={inverted} />
    </div>
  </div>
);

export default Header;
