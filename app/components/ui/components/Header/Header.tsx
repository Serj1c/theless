import React from 'react';
import classNames from 'classnames';
import { Margin } from '../../common/margins';
import { Color, Size, Text } from '../Text/Text';
import marginStyles from '../../styles/margins.module.css';
import lineHeightStyles from '../../styles/line-heights.module.css';
import styles from './Header.module.css';

export type Level = 1 | 2 | 3;
export type Align = 'left' | 'center' | 'right';
export type Weight = 'bold' | 'normal';

type WithoutClassName = Omit<React.HTMLAttributes<HTMLElement>, 'className'>;

interface LevelParams {
  size: Size;
  marginTop: Margin;
  marginBottom: Margin;
}

interface ParamsByLevel {
  [key: string]: LevelParams;
}

const paramsByLevel: ParamsByLevel = {
  1: {
    size: 'xxl',
    marginTop: 'l',
    marginBottom: 'xl',
  },
  2: {
    size: 'xl',
    marginTop: 'xl',
    marginBottom: 'xl',
  },
  3: {
    size: 'l',
    marginTop: 'm',
    marginBottom: 's',
  },
};

export interface Props extends WithoutClassName {
  /** Header level */
  level?: Level;
  /** Texts size */
  size?: Size;
  /** One line text */
  noWrap?: boolean;
  /** Text color */
  color?: Color;
  /** Text align */
  align?: Align;
  /** Font's weight */
  weight?: Weight;
  /** Top and bottom margins */
  margin?: Margin;
  /** Top margin */
  marginTop?: Margin;
  /** Bottom margin */
  marginBottom?: Margin;
}

export const Header: React.FunctionComponent<Props> = ({
  level = 2,
  size,
  color,
  weight = 'bold',
  align = 'left',
  noWrap,
  margin,
  marginTop,
  marginBottom,
  children,
  ...props
}) => {
  const sizeValue: Size = size || paramsByLevel[level].size;
  const marginTopValue: Margin =
    marginTop || margin || paramsByLevel[level].marginTop;
  const marginBottomValue: Margin =
    marginBottom || margin || paramsByLevel[level].marginBottom;
  const tagName = `h${level}`;
  const className = classNames(
    styles.root,
    styles[`root_align_${align}`],
    styles[`root_weight_${weight}`],
    lineHeightStyles[`line-height_${size}`],
    marginStyles[`top_${marginTopValue}`],
    marginStyles[`bottom_${marginBottomValue}`],
    {
      [styles.root_nowrap]: noWrap,
    }
  );
  const headerProps = {
    ...props,
    className,
  };
  const textProps = {
    weight,
    color,
    size: sizeValue,
    children,
  };

  return React.createElement(tagName, headerProps, <Text {...textProps} />);
};
