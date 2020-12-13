import React, { useMemo } from 'react';
import { Grid } from 'components/ui';
import { EventModel } from 'models/EventModel';
import { EventsSection } from 'components/common/EventsSection';
import { filterEvents } from './utils/filterEvents';

interface Props {
  list: EventModel[];
}

export const Overview: React.FunctionComponent<Props> = ({ list }) => {
  const [thisWeekEvents, thisMonthEvents, restEvents] = useMemo(
    () => filterEvents(list),
    [list]
  );
  const title =
    thisWeekEvents.length || thisMonthEvents.length
      ? 'Остальные события'
      : undefined;

  return (
    <Grid.Row>
      <Grid.Col>
        {/* This week events section */}
        {thisWeekEvents.length > 0 && (
          <EventsSection list={thisWeekEvents} title='На этой неделе' />
        )}

        {/* This month events section */}
        {thisMonthEvents.length > 0 && (
          <EventsSection list={thisMonthEvents} title='В этом месяце' />
        )}

        {/* The rest of the events */}
        {restEvents.length > 0 && (
          <EventsSection list={restEvents} title={title} />
        )}
      </Grid.Col>
    </Grid.Row>
  );
};
