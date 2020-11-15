import React from 'react';
import classNames from 'classnames';
import styles from './Text.module.css';

export type Color = 'default' | 'noaccent' | 'inverted' | 'caution' | 'inherit';
export type Size = 'xxl' | 'xl' | 'l' | 'm' | 's' | 'xs' | 'xxs';

type WithoutClassname = Omit<React.HTMLAttributes<HTMLElement>, 'className'>;

export interface Props extends WithoutClassname {
  /** Text color */
  color?: Color;
  /** Text size */
  size?: Size;
}

export const Text: React.FunctionComponent<Props> = ({
  color = 'default',
  size = 'm',
  children,
  ...props
}) => {
  const className = classNames(
    styles.root,
    styles[`root_color_${color}`],
    styles[`root_size_${size}`]
  );

  return (
    <span {...props} className={className}>
      {children}
    </span>
  );
};
