import React, { useCallback } from 'react';
import { Grid } from 'components/ui';
import { useFavorites } from 'hooks/useFavorites';
import { Like, Share } from './components';
import styles from './Controls.module.css';

interface Props {
  id: string;
  isFavorite: boolean;
}

/**
 * Render controls with Like and Share buttons
 */
export const Controls: React.FunctionComponent<Props> = (props) => {
  const { isFavorite, toggleFavorite } = useFavorites({
    type: 'event',
    ...props,
  });

  /**
   * Handle Like button click
   */
  const handleLike = useCallback((): void => {
    toggleFavorite();
  }, [toggleFavorite]);

  return (
    <Grid.Row>
      <Grid.Col>
        <div className={styles.root}>
          <Like isLiked={isFavorite} onLike={handleLike} />
          <Share isLiked={isFavorite} />
        </div>
      </Grid.Col>
    </Grid.Row>
  );
};
