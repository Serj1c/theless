import React from 'react';
import classNames from 'classnames';
import styles from './Container.module.css';

interface Props {
  fluid?: boolean;
}

export const Container: React.FunctionComponent<Props> = ({
  fluid,
  children,
}) => {
  const className = classNames(styles.root, { [styles.root_fluid]: fluid });

  return <div className={className}>{children}</div>;
};
