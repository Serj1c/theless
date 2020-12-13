import React from 'react';
import { Grid, Paragraph } from 'components/ui';

export const NoPosts: React.FunctionComponent = () => {
  return (
    <Grid.Row>
      <Grid.Col>
        <Paragraph size='xl' align='center'>
          Ждите, скоро все будет 😎
        </Paragraph>
      </Grid.Col>
    </Grid.Row>
  );
};
