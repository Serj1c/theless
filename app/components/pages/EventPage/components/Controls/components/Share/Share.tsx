import React, { useEffect, useRef, useState } from 'react';
import { Icon } from 'components/common';
import { Tooltip, Link } from 'components/ui';
import styles from './Share.module.css';
import {
  TWITTER_SHARE_URL,
  FACEBOOK_SHARE_URL,
  HOST_URL,
} from 'constants/common';
import { useRouter } from 'next/router';

const DELAY = 6000;

interface Props {
  isLiked: boolean;
}

export const Share: React.FunctionComponent<Props> = ({ isLiked }) => {
  const timerId = useRef(null);
  const isTooltipShown = useRef(isLiked);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const { asPath } = useRouter();
  const urlToShare = encodeURIComponent(HOST_URL + asPath);

  /**
   * Mount / unmount
   */
  useEffect(
    () => () => {
      clearTimeout(timerId.current);
    },
    []
  );

  /**
   * isLike prop changes handler
   */
  useEffect(() => {
    // Don't show tooltip if don't like or already shown
    if (!isLiked || isTooltipShown.current) {
      return;
    }

    setIsTooltipOpen(true);
    isTooltipShown.current = true;

    // Set timer to hide tooltip
    timerId.current = setTimeout(() => {
      setIsTooltipOpen(false);
    }, DELAY);
  }, [isLiked]);

  return (
    <div className={styles.root}>
      <Tooltip
        content='Поделитесь с друзями'
        placement='top'
        open={isTooltipOpen}
      >
        <span className={styles.icon}>
          <Icon type='share' />
        </span>
      </Tooltip>
      <Link
        href={FACEBOOK_SHARE_URL + urlToShare}
        target='_blank'
        design='default'
        rounded
        icon={<Icon type='facebook' color />}
      />
      <Link
        href={TWITTER_SHARE_URL + urlToShare}
        target='_blank'
        design='default'
        rounded
        icon={<Icon type='twitter' color />}
      />
    </div>
  );
};
