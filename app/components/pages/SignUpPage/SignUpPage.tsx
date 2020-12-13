import React from 'react';
import { Footer, Header, Page, PageHeader } from 'components/common';

export const SignUpPage: React.FunctionComponent = () => (
  <Page topOffset header={<Header />} footer={<Footer />}>
    <PageHeader title='Регистрация' align='center' />
  </Page>
);
