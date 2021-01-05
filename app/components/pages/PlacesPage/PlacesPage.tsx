import React from 'react';
import { Footer, Header, PageHeader } from 'components/common';
import { PageLayout } from 'components/layouts';
import { NoPlaces } from './components';

export const PlacesPage: React.FunctionComponent = () => (
  <PageLayout topOffset header={<Header />} footer={<Footer />}>
    <PageHeader title='Места' align='center' />

    <NoPlaces />
  </PageLayout>
);
