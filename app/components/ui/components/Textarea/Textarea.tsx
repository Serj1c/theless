import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import styles from './Textarea.module.css';

type Size = 's' | 'm' | 'l';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: Size;
}

export const Textarea: React.FunctionComponent<Props> = ({
  size = 'm',
  autoFocus,
  ...restProps
}) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const className = classNames(styles.root, styles[`root_size_${size}`]);

  useEffect(() => {
    if (ref.current && autoFocus) {
      ref.current.focus();
    }
  }, [autoFocus]);

  return <textarea ref={ref} {...restProps} className={className} />;
};
