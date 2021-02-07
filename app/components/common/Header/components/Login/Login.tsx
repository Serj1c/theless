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

export const Login: React.FunctionComponent<Props> = ({ inverted }) => {
  const { user } = useUser();

  const className = classNames(styles.root, {
    [styles.root_inverted]: inverted,
  });

  return (
    <Link href='/auth' passHref>
      <a className={className}>{user ? <ProfileIcon /> : <LoginIcon />}</a>
    </Link>
  );
};
