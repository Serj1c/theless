import React, { useEffect, useImperativeHandle, useRef } from 'react';
import classNames from 'classnames';
import styles from './Input.module.css';

type Size = 's' | 'm' | 'l';
type TextAlign = 'left' | 'center' | 'right';

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: Size;
  rounded?: boolean;
  textAlign?: TextAlign;
  ref?: React.Ref<HTMLInputElement>;
}

export const Input: React.FunctionComponent<Props> = React.forwardRef(
  (
    { size = 'm', textAlign = 'left', autoFocus, rounded, ...restProps },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current);

    const className = classNames(styles.root, styles[`root_size_${size}`], {
      [styles.root_rounded]: rounded,
      [styles[`root_text-align_${textAlign}`]]: textAlign,
    });

    // There is a Next.js issue when input doesn't get focus after the first
    // page renders and gets after component rerender.
    useEffect(() => {
      if (autoFocus) {
        inputRef.current.focus();
      }
    }, [autoFocus]);

    return <input ref={inputRef} className={className} {...restProps} />;
  }
);
