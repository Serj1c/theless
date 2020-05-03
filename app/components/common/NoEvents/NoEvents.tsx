import React from 'react';
import { Col, Row, Paragraph, Link } from 'components/ui';

// TODO Improvements
// 1. Add link to the parent location

const NoEvents = (): JSX.Element => (
    <Row>
        <Col
            cols={12}
            align='center'
            marginBottom='xl'
        >
            <Paragraph size='l'>
                В&nbsp;ближайшее время ничего не&nbsp;будет
            </Paragraph>
        </Col>
        <Col cols={12} align='center'>
            <Link
                href='/events/add'
                design='primary'
                size='l'
            >
                Добавить новое событие
            </Link>
        </Col>
    </Row>
);

export default NoEvents;
