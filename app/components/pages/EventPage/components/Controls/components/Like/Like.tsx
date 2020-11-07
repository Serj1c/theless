import React from 'react';
import { Icon } from 'components/common';
import { Button } from 'components/ui';

interface Props {
  isLiked: boolean;
  onLike: () => void;
}

export const Like: React.FunctionComponent<Props> = ({ isLiked, onLike }) => {
  const type = isLiked ? 'heart' : 'heartOutline';

  return (
    <Button
      design='secondary'
      rounded
      type='button'
      icon={<Icon type={type} color />}
      fullWidth
      onClick={onLike}
    >
      Мне нравится
    </Button>
  );
};
