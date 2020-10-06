import React from 'react';
import classNames from 'classnames';
import Link, { LinkProps } from 'next/link';
import styles from './Link.module.css';

type Design = 'link' | 'primary' | 'secondary' | 'danger' | 'default';
type Size = 's' | 'm' | 'l';

// TODO Extends add Link attributes
interface Props extends LinkProps {
  design?: Design;
  size?: Size;
  rounded?: boolean;
  children: React.ReactNode;
  target?: string;
}

const LinkComponent = ({
  design = 'link',
  rounded,
  size = 'm',
  href,
  as,
  ...props
}: Props): JSX.Element => {
  const isButtonDesign = design !== 'link';
  const className = classNames(styles.root, styles[`root_design_${design}`], {
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
    <Link href={href} as={as} passHref>
      <a {...props} href={href as string} className={className} />
    </Link>
  );
};

export default LinkComponent;
