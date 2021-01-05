import React from 'react';
import { Footer, Header, PageHeader, EventsSection } from 'components/common';
import { PageLayout } from 'components/layouts';
import { FavoriteModel } from 'models';

export interface Props {
  list: FavoriteModel[];
}

export const Favorite: React.FunctionComponent<Props> = ({ list }) => (
  <PageLayout topOffset header={<Header />} footer={<Footer />}>
    <PageHeader title='Избранное' align='center' />

    {/* TODO Add NoFavorite component */}
    {list.length ? (
      <EventsSection list={list} />
    ) : (
      <p>У вас пока ничего нет в&nbsp;избранном</p>
    )}
  </PageLayout>
);
