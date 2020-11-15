import React, { useCallback } from 'react';
import Link from 'next/link';
import { Grid, Header, Paragraph } from 'components/ui';
import { EventModel } from 'models/EventModel';
import { formatDate } from 'utils/formatDate';
import { Like } from './components';
import styles from './Item.module.css';

interface Props {
  item: EventModel;
}

export const Item: React.FunctionComponent<Props> = ({ item }) => {
  /**
   * Item click handler
   */
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = useCallback(
    (event) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      let element = event.target;

      while (element !== event.currentTarget) {
        // Don't go link if button of link was click in children tree
        if (element.tagName === 'BUTTON') {
          event.preventDefault();
          break;
        }

        element = element.parentElement;
      }
    },
    []
  );

  return (
    <Link
      href={`/[location]/events/[event]`}
      as={`/${item.location.slug}/events/${item.slug}`}
      passHref
    >
      <a className={styles.link} onClick={handleClick}>
        {/* Cover */}
        <div
          className={styles.cover}
          style={{
            backgroundImage: `url(${item.cover})`,
          }}
        />

        {/* Header and like button */}
        <Grid.Row>
          <Grid.Col cols={9}>
            <Header level={3} size='l' margin='none'>
              {item.name}
            </Header>
          </Grid.Col>

          {/* Add to favorite button */}
          <Grid.Col align='right' cols={3}>
            {/* TODO Implement isFavorite prop */}
            <Like id={item.id} isFavorite={false} />
          </Grid.Col>
        </Grid.Row>

        <Paragraph color='noaccent'>
          {formatDate(item.dateStart, item.dateEnd)}
        </Paragraph>

        <Paragraph color='noaccent'>{item.address}</Paragraph>
      </a>
    </Link>
  );
};
