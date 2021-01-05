import React from 'react';
import { Footer, Header, PageHeader } from 'components/common';
import { PageLayout } from 'components/layouts';
import { NoLearning } from './components';

export const LearningPage: React.FunctionComponent = () => (
  <PageLayout topOffset header={<Header />} footer={<Footer />}>
    <PageHeader title='Обучение' align='center' />

    <NoLearning />
  </PageLayout>
);
