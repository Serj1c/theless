import React from 'react';
import Logo from './components/Logo/Logo';
import styles from './Header.module.css';

interface Props {
    inverted?: boolean;
}

const Header = ({ inverted }: Props): JSX.Element => (
    <div className={styles.root}>
        <Logo inverted={inverted} />
    </div>
);

export default Header;
