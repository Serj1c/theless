import React from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { ButtonDesign, ButtonSize } from '../../common';
import designStyles from '../../styles/design.module.css';
import styles from './Button.module.css';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  design?: ButtonDesign;
  size?: ButtonSize;
  rounded?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  loading?: boolean;
}

export const Button: React.FunctionComponent<Props> = ({
  design = 'default',
  size = 'm',
  rounded = false,
  fullWidth = false,
  loading = false,
  type = 'button',
  children,
  disabled,
  icon,
  ...props
}) => {
  const buttonClassName = classNames(
    styles.root,
    designStyles[design],
    styles[`root_size_${size}`],
    {
      [styles.root_withIcon]: icon,
      [styles.root_onlyIcon]: !children,
      [styles.root_rounded]: rounded,
      [styles.root_fullwidth]: fullWidth,
      [styles.root_loading]: loading,
    }
  );
  const iconClassName = classNames(styles.icon, {
    [styles.icon_onlyIcon]: !children,
  });

  return (
    <button
      className={buttonClassName}
      type={type}
      disabled={loading || disabled}
      {...props}
    >
      {icon && <span className={iconClassName}>{icon}</span>}
      {children}
      {loading && (
        <div className={styles.loader}>
          <Loader color='inverted' />
        </div>
      )}
    </button>
  );
};
