import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { useUser } from 'components/providers/UserProvider/useUser';
import ProfileIcon from './resources/profile.svg';
import LoginIcon from './resources/login.svg';
import styles from './Login.module.css';

interface Props {
  inverted?: boolean;
}

export const Login = ({ inverted }: Props): JSX.Element => {
  const { user, setUser } = useUser();

  const className = classNames(styles.root, {
    [styles.root_inverted]: inverted,
  });

  return (
    <Link href='/login' passHref>
      <a className={className}>{user ? <ProfileIcon /> : <LoginIcon />}</a>
    </Link>
  );
};