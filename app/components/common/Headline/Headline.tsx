import React, { memo } from 'react';
import { Header } from 'components/ui';

interface Props {
  locationName: string;
  period: string | null;
}

const Headline = ({ locationName, period }: Props) => {
  let title: string;

  switch (period) {
    case 'week': {
      title = `События в ${locationName} на этой неделе`;
      break;
    }
    case 'month': {
      title = `События в ${locationName} в этом месяце`;
      break;
    }
    case 'all': {
      title = `Все события в ${locationName}`;
      break;
    }
    default: {
      title = `События в ${locationName}`;
    }
  }

  return (
    <Header level={1} align='center'>
      {title}
    </Header>
  );
};

export default memo(Headline);
