import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import LogoIcon from './resources/logo.svg';
import styles from './Logo.module.css';

const HOMEPAGE_URL = '/events';

interface Props {
  inverted?: boolean;
}

export const Logo: React.FunctionComponent<Props> = ({ inverted }) => {
  const { pathname } = useRouter();

  const logoClassName = classNames(styles.logo, {
    [styles.logo_inverted]: inverted,
  });

  if (pathname === HOMEPAGE_URL) {
    return <LogoIcon className={logoClassName} />;
  }

  return (
    <Link href='/events'>
      <a className={styles.link}>
        <LogoIcon className={logoClassName} />
      </a>
    </Link>
  );
};
