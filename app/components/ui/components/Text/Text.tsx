/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import classNames from 'classnames';
import styles from './Text.module.css';

export type Color = 'default' | 'noaccent' | 'inverted' | 'danger' | 'inherit';
export type Size = 'xxl' | 'xl' | 'l' | 'm' | 's' | 'xs' | 'xxs';

type WithoutClassname = Omit<React.HTMLAttributes<HTMLElement>, 'className'>

export interface Props extends WithoutClassname {
    /** Text color */
    color?: Color;
    /** Text size */
    size?: Size;
}

const Text = ({ color, size, children, ...props }: Props): JSX.Element => {
    const className = classNames(styles.root, styles[`root_color_${color}`], styles[`root_size_${size}`]);

    return (
        <span
            {...props}
            className={className}>
            {children}
        </span>
    );
};

Text.defaultProps = {
    color: 'default',
    size: 'm',
};

export default Text;
