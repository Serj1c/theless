import React, { memo } from 'react';
import { Header, Paragraph, Link } from 'components/ui';
import { EventModel } from 'models/EventModel';
import styles from './Item.module.css';
import { formatDate } from 'utils/formatDate';

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
        }}
      />
      <Header level={3} size='l'>
        {item.name}
      </Header>

      <Paragraph color='noaccent'>
        {formatDate(item.dateStart, item.dateEnd)}
      </Paragraph>

      <Paragraph color='noaccent'>{item.address}</Paragraph>
    </Link>
  </div>
);

export default memo(Item);
