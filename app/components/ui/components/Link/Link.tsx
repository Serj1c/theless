import React from 'react';
import classNames from 'classnames';
import NextLink, { LinkProps } from 'next/link';
import styles from './Link.module.css';

type Design = 'link' | 'primary' | 'secondary' | 'danger' | 'default';
type Color = 'light' | 'dark';
type Size = 's' | 'm' | 'l';

// TODO Extends add Link attributes
interface Props extends LinkProps {
  design?: Design;
  size?: Size;
  color?: Color;
  rounded?: boolean;
  children: React.ReactNode;
  target?: string;
}

export const Link: React.FunctionComponent<Props> = ({
  design = 'link',
  color,
  rounded,
  size = 'm',
  href,
  as,
  ...props
}) => {
  const isButtonDesign = design !== 'link';
  const className = classNames(styles.root, styles[`root_design_${design}`], {
    [styles[`root_color_${color}`]]: color,
    [styles[`root_size_${size}`]]: size && isButtonDesign,
    [styles.root_rounded]: rounded && isButtonDesign,
  });

  if (
    (typeof href === 'string' && href.startsWith('mailto:')) ||
    props.target
  ) {
    return <a {...props} href={href as string} className={className} />;
  }

  return (
    <NextLink href={href} as={as} passHref>
      <a {...props} href={href as string} className={className} />
    </NextLink>
  );
};
