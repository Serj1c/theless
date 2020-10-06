import React, { memo } from 'react';
import { Row, Col, Header } from 'components/ui';
import { EventModel } from 'models/EventModel';
import Item from './components/Item/Item';

type Period = 'week' | 'month' | 'all';

interface Props {
  list: EventModel[];
  period?: Period;
  title?: string;
  itemCount: number;
}

const EventsSection = ({ list, title }: Props): JSX.Element => {
  return (
    <>
      {Boolean(title) && (
        <Row margin='none'>
          <Col cols={12}>
            <Header level={2} align='center' marginTop='none'>
              {title}
            </Header>
          </Col>
        </Row>
      )}

      <Row margin='none'>
        {list.map((item) => (
          <Col key={item.id} cols={12} colsSM={6} colsMD={4} marginBottom='xl'>
            <Item item={item} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default memo(EventsSection);
