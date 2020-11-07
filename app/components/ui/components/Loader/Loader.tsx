import React from 'react';
import classNames from 'classnames';
import styles from './Loader.module.css';

type Size = 's' | 'm' | 'l';

type Color = 'inverted';

interface Props {
  size?: Size;
  color?: Color;
}

export const Loader: React.FunctionComponent<Props> = ({
  size = 'm',
  color,
}: Props): JSX.Element => {
  const className = classNames(styles.root, styles[`root_size_${size}`], {
    [styles[`root_color_${color}`]]: color,
  });

  return <div className={className} />;
};
