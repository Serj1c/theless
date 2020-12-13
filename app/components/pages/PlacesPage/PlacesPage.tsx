import React from 'react';
import { Footer, Header, Page, PageHeader } from 'components/common';
import { NoPlaces } from './components';

export const PlacesPage: React.FunctionComponent = () => (
  <Page topOffset header={<Header />} footer={<Footer />}>
    <PageHeader title='Места' align='center' />

    <NoPlaces />
  </Page>
);
