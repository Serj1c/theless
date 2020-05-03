import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './Container.module.css';

interface Props {
    fluid?: boolean;
}

const Container = ({ fluid, children }: PropsWithChildren<Props>): JSX.Element => {
    const className = classNames(styles.root, { [styles.root_fluid]: fluid });

    return (
        <div className={className}>
            {children}
        </div>
    );
}

export default Container;
