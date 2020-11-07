import React, { useCallback } from 'react';
import { Icon } from 'components/common';
import { useFavorites } from 'hooks';
import styles from './Like.module.css';

interface Props {
  id: string;
  isFavorite: boolean;
}

export const Like: React.FunctionComponent<Props> = (props) => {
  const { isFavorite, toggleFavorite } = useFavorites({
    type: 'event',
    ...props,
  });

  const type = isFavorite ? 'heart' : 'heartOutline';

  /**
   * Icon click handler
   */
  const handleClick = useCallback(() => {
    toggleFavorite();
  }, [toggleFavorite, isFavorite]);

  return (
    <button type='button' className={styles.root} onClick={handleClick}>
      <Icon type={type} color />
    </button>
  );
};
