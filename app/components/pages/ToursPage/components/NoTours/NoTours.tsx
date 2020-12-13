import React from 'react';
import { Grid, Paragraph } from 'components/ui';

export const NoTours: React.FunctionComponent = () => {
  return (
    <Grid.Row>
      <Grid.Col>
        <Paragraph size='xl' align='center'>
          Не найдено ни одного тура
        </Paragraph>
      </Grid.Col>
    </Grid.Row>
  );
};
