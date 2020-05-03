import React, { memo, useMemo } from 'react';
import { Row, Col } from 'components/ui'
import { EventModel } from 'models/EventModel';
import EventsSection from 'components/common/EventsSection/EventsSection';
import filterEvents from './utils/filterEvents';

interface Props {
    list: EventModel[];
}

const Overview = ({ list }: Props): JSX.Element => {
    const [thisWeekEvents, thisMonthEvents, restEvents] = useMemo(() => filterEvents(list), [list]);
    const title = thisWeekEvents.length || thisMonthEvents.length ? 'Остальные события' : undefined;

    return (
        <Row>
            <Col>
                {/* This week events section */}
                {thisWeekEvents.length > 0 && (
                    <EventsSection
                        list={thisWeekEvents}
                        title='На этой неделе'
                        period='week'
                        itemCount={thisWeekEvents.length} />
                )}

                {/* This month events section */}
                {thisMonthEvents.length > 0 && (
                    <EventsSection
                        list={thisMonthEvents}
                        title='В этом месяце'
                        period='month'
                        itemCount={thisMonthEvents.length + thisMonthEvents.length} />
                )}

                {/* The rest of the events */}
                {restEvents.length > 0 && (
                    <EventsSection
                        list={restEvents}
                        title={title}
                        period='all'
                        itemCount={list.length} />
                )}
            </Col>
        </Row>
    );
}

export default memo(Overview);
