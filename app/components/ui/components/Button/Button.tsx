import React from 'react';
import classNames from 'classnames';
import Loader from '../Loader/Loader';
import styles from './Button.module.css';

type Design = 'primary' | 'secondary' | 'danger' | 'default';

type Size = 's' | 'm' | 'l';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  design?: Design;
  size?: Size;
  rounded?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
}

const Button = ({
  design = 'default',
  size = 'm',
  rounded = false,
  fullWidth = false,
  loading = false,
  type = 'button',
  children,
  disabled,
  ...props
}: Props): JSX.Element => {
  const buttonClassName = classNames(
    styles.root,
    styles[`root_design_${design}`],
    styles[`root_size_${size}`],
    {
      [styles.root_rounded]: rounded,
      [styles.root_fullwidth]: fullWidth,
      [styles.root_loading]: loading,
    }
  );

  return (
    // eslint-disable-next-line react/button-has-type
    <button
      className={buttonClassName}
      type={type}
      disabled={loading || disabled}
      {...props}
    >
      {children}
      {loading && (
        <div className={styles.loader}>
          <Loader color='inverted' />
        </div>
      )}
    </button>
  );
};

export default Button;
