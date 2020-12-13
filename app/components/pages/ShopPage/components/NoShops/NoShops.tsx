import React from 'react';
import { Grid, Paragraph } from 'components/ui';

export const NoShops: React.FunctionComponent = () => {
  return (
    <Grid.Row>
      <Grid.Col>
        <Paragraph size='xl' align='center'>
          Мы работаем над этим разделом 😎
        </Paragraph>
      </Grid.Col>
    </Grid.Row>
  );
};
