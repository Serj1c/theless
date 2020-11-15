import React from 'react';
import { Grid, Link, Paragraph } from 'components/ui';

// TODO Improvements
// 1. Add link to the parent location

export const NoEvents: React.FunctionComponent = () => (
  <Grid.Row>
    <Grid.Col cols={12} align='center' marginBottom='xl'>
      <Paragraph size='l'>
        В&nbsp;ближайшее время ничего не&nbsp;будет
      </Paragraph>
    </Grid.Col>
    <Grid.Col cols={12} align='center'>
      <Link href='/events/add' design='primary' size='l'>
        Добавить новое событие
      </Link>
    </Grid.Col>
  </Grid.Row>
);
