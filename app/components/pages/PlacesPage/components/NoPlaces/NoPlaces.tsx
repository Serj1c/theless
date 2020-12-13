import React from 'react';
import { Grid, Paragraph } from 'components/ui';

export const NoPlaces: React.FunctionComponent = () => {
  return (
    <Grid.Row>
      <Grid.Col>
        <Paragraph size='xl' align='center'>
          Не найдено ни одного места
        </Paragraph>
      </Grid.Col>
    </Grid.Row>
  );
};
