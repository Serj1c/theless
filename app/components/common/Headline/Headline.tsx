import React from 'react';
import { Header } from 'components/ui';
import { getTitle } from './utils';

interface Props {
  locationName: string;
  period: string | null;
}

export const Headline: React.FunctionComponent<Props> = ({
  locationName,
  period,
}) => (
  <Header level={1} align='center'>
    {getTitle(period, locationName)}
  </Header>
);
