import React from 'react';
import classNames from 'classnames';
import { Color, Size, Text } from '../Text/Text';
import { Margin } from '../../common/margins';
import marginStyles from '../../styles/margins.module.css';
import lineHeightStyles from '../../styles/line-heights.module.css';
import styles from './Paragraph.module.css';

export type Align = 'left' | 'center' | 'right';

type WithoutClassName = Omit<React.HTMLAttributes<HTMLElement>, 'className'>;

export interface Props extends WithoutClassName {
  /** Text size */
  size?: Size;
  /** Text color */
  color?: Color;
  /** Text alignment */
  align?: Align;
  /** Top and bottom margin */
  margin?: Margin;
  /** Top margin */
  marginTop?: Margin;
  /** Bottom margin */
  marginBottom?: Margin;
  /** Data marker */
  marker?: string;
}

export const Paragraph: React.FunctionComponent<Props> = ({
  children,
  size = 'm',
  color = 'default',
  align = 'left',
  margin = 'xs',
  marginTop,
  marginBottom,
  ...props
}) => {
  const className = classNames(
    styles[`root_align_${align}`],
    lineHeightStyles[`line-height_${size}`],
    marginStyles[`top_${marginTop || margin}`],
    marginStyles[`bottom_${marginBottom || margin}`]
  );

  return (
    <p {...props} className={className}>
      <Text size={size} color={color}>
        {children}
      </Text>
    </p>
  );
};
