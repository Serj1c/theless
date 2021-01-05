import React from 'react';
import { Footer, Header, PageHeader } from 'components/common';
import { PageLayout } from 'components/layouts';
import { NoPosts } from './components';

export const BlogPage: React.FunctionComponent = () => (
  <PageLayout topOffset header={<Header />} footer={<Footer />}>
    <PageHeader title='Блог' align='center' />

    <NoPosts />
  </PageLayout>
);
