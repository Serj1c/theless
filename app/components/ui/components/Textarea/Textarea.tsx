import React, { memo, useRef, useEffect } from 'react';
import classNames from 'classnames';
import styles from './Textarea.module.css';

type Size = 's' | 'm' | 'l';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    size?: Size;
}

const Textarea = ({ size, autoFocus, ...restProps }: Props): JSX.Element => {
    const ref = useRef<HTMLTextAreaElement>(null);
    const className = classNames(styles.root, styles[`root_size_${size}`]);

    useEffect(() => {
        if (ref.current && autoFocus) {
            ref.current.focus();
        }
    }, [autoFocus]);

    return <textarea ref={ref} {...restProps} className={className} />;
};

Textarea.defaultProps = {
    size: 'm'
};

export default memo(Textarea);
