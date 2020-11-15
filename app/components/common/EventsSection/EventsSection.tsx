import React from 'react';
import { Grid, Header } from 'components/ui';
import { EventModel } from 'models/EventModel';
import { Item } from './components/Item';

type Period = 'week' | 'month' | 'all';

interface Props {
  list: EventModel[];
  period?: Period;
  title?: string;
  itemCount: number;
}

export const EventsSection: React.FunctionComponent<Props> = ({
  list,
  title,
}) => (
  <>
    {Boolean(title) && (
      <Grid.Row margin='none'>
        <Grid.Col cols={12}>
          <Header level={2} align='center' marginTop='none'>
            {title}
          </Header>
        </Grid.Col>
      </Grid.Row>
    )}

    <Grid.Row margin='none'>
      {list.map((item) => (
        <Grid.Col
          key={item.id}
          cols={12}
          colsSM={6}
          colsMD={4}
          marginBottom='xl'
        >
          <Item item={item} />
        </Grid.Col>
      ))}
    </Grid.Row>
  </>
);
