import React from 'react';
import {
  Footer,
  Header,
  PageHeader,
  SubscriptionForm,
} from 'components/common';
import { PageLayout } from 'components/layouts';
import { EventModel } from 'models';
import { Cover, Description, MapSection, Controls } from './components';

interface Props {
  item?: EventModel;
}

export const EventPage = ({ item }: Props): JSX.Element => (
  <PageLayout header={<Header inverted />} footer={<Footer />}>
    {/* Cover section */}
    <Cover img={item.cover} />

    {/* Headline section */}
    <PageHeader title={item.name} />

    {/* Controls */}
    {/* TODO Implement isFavorite */}
    <Controls id={item.id} isFavorite={item.isFavorite} />

    {/* Description section*/}
    <Description item={item} />

    {/* Map  section */}
    {item.coordinates && <MapSection coordinates={item.coordinates} />}

    {/* Subscription form */}
    <SubscriptionForm
      title='Подписаться на&nbsp;это событие'
      params={{
        eventId: item.id,
      }}
    />
  </PageLayout>
);
