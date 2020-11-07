import React from 'react';
import { Footer, Header, Page, PageHeader } from 'components/common';

export const Favorite: React.FunctionComponent = () => (
  <Page topOffset header={<Header />} footer={<Footer />}>
    <PageHeader title={'Избранное'} />
  </Page>
);
