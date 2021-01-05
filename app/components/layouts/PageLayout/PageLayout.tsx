import React, { ReactNode, useEffect } from 'react';
import classNames from 'classnames';
import { Container, Loader } from 'components/ui';
import styles from './PageLayout.module.css';

const handleResize = (): void => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

interface Props {
  children?: ReactNode;
  /** Header section */
  header?: ReactNode;
  /** Footer section */
  footer?: ReactNode;
  /** Align content in the center */
  center?: boolean;
  /** Is page loading */
  loading?: boolean;
  /** Page with top offset */
  topOffset?: boolean;
}

export const PageLayout: React.FunctionComponent<Props> = ({
  header,
  footer,
  center,
  topOffset,
  loading,
  children,
}) => {
  useEffect((): (() => void) => {
    handleResize();

    window.addEventListener('resize', handleResize);

    return (): void => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const rootClassName = classNames(styles.root, {
    [styles.root_offset_top]: topOffset,
  });
  const contentClassName = classNames(styles.content, {
    [styles.content_center]: center || loading,
  });

  return (
    <div className={rootClassName}>
      {header && <div className={styles.header}>{header}</div>}

      <div className={contentClassName}>
        {loading ? <Loader size='l' /> : <Container>{children}</Container>}
      </div>

      {footer && !loading && <div className={styles.footer}>{footer}</div>}
    </div>
  );
};
