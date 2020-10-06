import React from 'react';
import classNames from 'classnames';
import styles from './Row.module.css';
import marginsStyles from '../../common/margins.module.css';
import { Margin, DEFAULT_MARGIN } from '../../common/margins';

interface Props {
  children?: React.ReactNode;
  margin?: Margin;
  marginTop?: Margin;
  marginBottom?: Margin;
}

const Row = ({
  children,
  marginTop = DEFAULT_MARGIN,
  marginBottom = DEFAULT_MARGIN,
  margin,
}: Props): JSX.Element => {
  const className = classNames(
    styles.root,
    marginsStyles[`top_${margin || marginTop}`],
    marginsStyles[`bottom_${margin || marginBottom}`]
  );

  return <div className={className}>{children}</div>;
};

export default Row;
