import React from 'react';
import { Footer, Header, Page, PageHeader } from 'components/common';
import { NoShops } from './components';

export const ShopPage: React.FunctionComponent = () => (
  <Page topOffset header={<Header />} footer={<Footer />}>
    <PageHeader title='Магазин' align='center' />

    <NoShops />
  </Page>
);
