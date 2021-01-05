import React from 'react';
import { Footer, Header, PageHeader } from 'components/common';
import { PageLayout } from 'components/layouts';
import { NoTours } from './components';

export const ToursPage: React.FunctionComponent = () => (
  <PageLayout topOffset header={<Header />} footer={<Footer />}>
    <PageHeader title='Туры' align='center' />

    <NoTours />
  </PageLayout>
);
