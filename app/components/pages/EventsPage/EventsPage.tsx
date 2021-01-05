import React from 'react';
import {
  Footer,
  Header,
  NoEvents,
  Overview,
  PageHeader,
  SubscriptionForm,
} from 'components/common';
import { PageLayout } from 'components/layouts';
import { EventModel } from 'models/EventModel';

interface Props {
  title: string;
  list?: EventModel[];
}

export const EventsPage = ({ list, title }: Props): JSX.Element => (
  <PageLayout topOffset header={<Header />} footer={<Footer />}>
    {/* Page header */}
    <PageHeader title={title} align='center' />

    {list.length === 0 ? (
      <NoEvents />
    ) : (
      <>
        {/* List of events */}
        <Overview list={list} />

        {/*Subscription form */}
        <SubscriptionForm title='Подписаться на&nbsp;новые события' />
      </>
    )}
  </PageLayout>
);
