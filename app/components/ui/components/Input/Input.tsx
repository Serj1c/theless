import React, { memo, useEffect, useRef } from 'react';
import classNames from 'classnames';
import styles from './Input.module.css';

type Size = 's' | 'm' | 'l';
type TextAlign = 'left' | 'center' | 'right';

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: Size;
  rounded?: boolean;
  textAlign?: TextAlign;
}

const Input = ({
  size = 'm',
  textAlign = 'left',
  rounded,
  autoFocus,
  ...restProps
}: Props): JSX.Element => {
  const ref = useRef<HTMLInputElement>(null);
  const className = classNames(styles.root, styles[`root_size_${size}`], {
    [styles.root_rounded]: rounded,
    [styles[`root_text-align_${textAlign}`]]: textAlign,
  });

  useEffect(() => {
    if (ref.current && autoFocus) {
      ref.current.focus();
    }
  }, [autoFocus]);

  return <input ref={ref} className={className} {...restProps} />;
};

export default memo(Input);
