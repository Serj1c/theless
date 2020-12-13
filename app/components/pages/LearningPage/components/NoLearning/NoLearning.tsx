import React from 'react';
import { Grid, Paragraph } from 'components/ui';

export const NoLearning: React.FunctionComponent = () => {
  return (
    <Grid.Row>
      <Grid.Col>
        <Paragraph size='xl' align='center'>
          Не найдено ни одного инструктора
        </Paragraph>
      </Grid.Col>
    </Grid.Row>
  );
};
