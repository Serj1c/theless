import React from 'react';
import { Footer, Header, Page, PageHeader } from 'components/common';
import { NoPosts } from './components';

export const BlogPage: React.FunctionComponent = () => (
  <Page topOffset header={<Header />} footer={<Footer />}>
    <PageHeader title='Блог' align='center' />

    <NoPosts />
  </Page>
);
