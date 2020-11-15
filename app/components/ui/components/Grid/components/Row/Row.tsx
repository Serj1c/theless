import React from 'react';
import classNames from 'classnames';
import marginsStyles from '../../../../styles/margins.module.css';
import { DEFAULT_MARGIN, Margin } from '../../../../common/margins';
import styles from './Row.module.css';

interface Props {
  children?: React.ReactNode;
  margin?: Margin;
  marginTop?: Margin;
  marginBottom?: Margin;
  noGutter?: boolean;
}

export const Row: React.FunctionComponent<Props> = ({
  children,
  marginTop = DEFAULT_MARGIN,
  marginBottom = DEFAULT_MARGIN,
  margin,
  noGutter,
}) => {
  const className = classNames(
    styles.root,
    marginsStyles[`top_${margin || marginTop}`],
    marginsStyles[`bottom_${margin || marginBottom}`],
    {
      [styles.root_noGutter]: noGutter,
    }
  );

  return <div className={className}>{children}</div>;
};
