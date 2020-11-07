import React from 'react';
import classNames from 'classnames';
import Close from './resources/close.svg';
import Facebook from './resources/facebook.svg';
import Heart from './resources/heart.svg';
import HeartOutline from './resources/heart-outline.svg';
import Share from './resources/share.svg';
import Twitter from './resources/twitter.svg';
import styles from './Icon.module.css';

interface Props {
  type: 'heart' | 'heartOutline' | 'share' | 'facebook' | 'twitter' | 'close';
  color?: boolean;
  size?: 's' | 'm' | 'l';
}

export const Icon: React.FunctionComponent<Props> = ({
  size = 'm',
  type,
  color,
}) => {
  const className = classNames(styles[`root_size_${size}`], {
    [styles.root_type_facebook]: color && type === 'facebook',
    [styles.root_type_twitter]: color && type === 'twitter',
    [styles.root_type_heart]: color && type === 'heart',
  });

  switch (type) {
    case 'close': {
      return <Close className={className} />;
    }
    case 'heart': {
      return <Heart className={className} />;
    }
    case 'heartOutline': {
      return <HeartOutline className={className} />;
    }
    case 'share': {
      return <Share className={className} />;
    }
    case 'facebook': {
      return <Facebook className={className} />;
    }
    case 'twitter': {
      return <Twitter className={className} />;
    }
    default: {
      return null;
    }
  }
};
