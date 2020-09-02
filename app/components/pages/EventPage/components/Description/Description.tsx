import React from 'react';
import { Col, Link, Paragraph, Row } from 'components/ui';
import { formatDate } from 'utils/formatDate';
import { EventModel } from 'models';

interface Props {
    item: EventModel
}

const Description = ({ item }: Props): JSX.Element => (
    <Row>
        <Col cols={12} colsLG={8}>
            <Paragraph marginTop='none' size='l' color='noaccent'>
                {formatDate(item.dateStart, item.dateEnd)}
            </Paragraph>

            <Paragraph size='l' color='noaccent'>
                {item.location.name}, {item.address}
            </Paragraph>

            {/* Link to the event's official site */}
            {item.link && (
                <Paragraph size='l' marginTop='l'>
                    <Link href={item.link} target='_blank'>Официальный сайт</Link>
                </Paragraph>
            )}

            {item.description && (
                <Paragraph marginTop='l' size='l'>
                    {item.description}
                </Paragraph>
            )}
        </Col>
    </Row>
);

export default Description;
