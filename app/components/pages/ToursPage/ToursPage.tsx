import React from 'react';
import { Footer, Header, Page, PageHeader } from 'components/common';
import { NoTours } from './components';

export const ToursPage: React.FunctionComponent = () => (
  <Page topOffset header={<Header />} footer={<Footer />}>
    <PageHeader title='Туры' align='center' />

    <NoTours />
  </Page>
);
