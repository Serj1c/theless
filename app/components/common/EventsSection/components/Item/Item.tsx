import React, { memo } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import { Header, Paragraph, Link } from 'components/ui';
import { EventModel } from 'models/EventModel';
import styles from './Item.module.css';

interface Props {
    item: EventModel;
}

const Item = ({ item }: Props): JSX.Element => (
    <div className={styles.root}>
        <Link
            href={`/[location]/events/[event]`}
            as={`/${item.location.slug}/events/${item.slug}`}
        >
            <div
                className={styles.cover}
                style={{
                    backgroundImage: `url(${item.cover})`,
                }} />
            <Header level={3} size='l'>
                {item.name}
            </Header>
            <Paragraph color='noaccent'>
                {moment(item.date).locale('ru').format('D MMMM, dddd')}
            </Paragraph>
            <Paragraph color='noaccent'>
                {item.address}
            </Paragraph>
        </Link>
    </div>
);

export default memo(Item);
