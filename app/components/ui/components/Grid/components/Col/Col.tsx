import React from 'react';
import classNames from 'classnames';
import { Margin } from '../../../../common/margins';
import marginsStyles from '../../../../styles/margins.module.css';
import styles from './Col.module.css';

type cols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type Offsets = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

type Align = 'left' | 'center' | 'right';

type VerticalAlign = 'top' | 'center' | 'bottom';

interface Props {
  children?: React.ReactNode;
  // Columns
  cols?: cols;
  colsSM?: cols;
  colsMD?: cols;
  colsLG?: cols;
  colsXL?: cols;
  // Offsets
  offset?: Offsets;
  offsetSM?: Offsets;
  offsetMD?: Offsets;
  offsetLG?: Offsets;
  offsetXL?: Offsets;
  // Vertical margins
  margin?: Margin;
  marginTop?: Margin;
  marginBottom?: Margin;
  // Other
  noGutters?: boolean;
  align?: Align;
  verticalAlign?: VerticalAlign;
}

const DEFAULT_MARGIN = 'none';

export const Col: React.FunctionComponent<Props> = ({
  children,
  cols,
  colsSM,
  colsMD,
  colsLG,
  colsXL,
  offset,
  offsetSM,
  offsetMD,
  offsetLG,
  offsetXL,
  margin,
  marginTop = DEFAULT_MARGIN,
  marginBottom = DEFAULT_MARGIN,
  noGutters,
  align,
  verticalAlign,
}) => {
  const className = classNames(
    styles.root,
    marginsStyles[`top_${margin || marginTop}`],
    marginsStyles[`bottom_${margin || marginBottom}`],
    {
      [styles[`root_cols_${cols}`]]: cols,
      [styles[`root_cols_sm_${colsSM}`]]: colsSM,
      [styles[`root_cols_md_${colsMD}`]]: colsMD,
      [styles[`root_cols_lg_${colsLG}`]]: colsLG,
      [styles[`root_cols_xl_${colsXL}`]]: colsXL,
      [styles[`root_offset_${offset}`]]: offset,
      [styles[`root_offset-sm_${offsetSM}`]]: offsetSM,
      [styles[`root_offset-md_${offsetMD}`]]: offsetMD,
      [styles[`root_offset-lg_${offsetLG}`]]: offsetLG,
      [styles[`root_offset-xl_${offsetXL}`]]: offsetXL,
      [styles['root_no-gutters']]: noGutters,
      [styles[`root_align_${align}`]]: align,
      [styles[`root_vertical-align_${verticalAlign}`]]: verticalAlign,
    }
  );

  return <div className={className}>{children}</div>;
};
