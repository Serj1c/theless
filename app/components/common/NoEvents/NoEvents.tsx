import React from 'react';
import { Col, Link, Paragraph, Row } from 'components/ui';

// TODO Improvements
// 1. Add link to the parent location

export const NoEvents: React.FunctionComponent = () => (
  <Row>
    <Col cols={12} align='center' marginBottom='xl'>
      <Paragraph size='l'>
        В&nbsp;ближайшее время ничего не&nbsp;будет
      </Paragraph>
    </Col>
    <Col cols={12} align='center'>
      <Link href='/events/add' design='primary' size='l'>
        Добавить новое событие
      </Link>
    </Col>
  </Row>
);
