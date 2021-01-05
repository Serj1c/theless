import React from 'react';
import { Footer, Header, PageHeader } from 'components/common';
import { PageLayout } from 'components/layouts';
import { NoShops } from './components';

export const ShopPage: React.FunctionComponent = () => (
  <PageLayout topOffset header={<Header />} footer={<Footer />}>
    <PageHeader title='Магазин' align='center' />

    <NoShops />
  </PageLayout>
);
