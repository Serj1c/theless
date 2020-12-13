import React from 'react';
import { Footer, Header, Page, PageHeader } from 'components/common';

export const LoginPage: React.FunctionComponent = () => (
  <Page topOffset header={<Header />} footer={<Footer />}>
    <PageHeader title='Вход' align='center' />
  </Page>
);
