import React from 'react';
import { Footer, Header, Page, PageHeader } from 'components/common';
import { NoLearning } from './components';

export const LearningPage: React.FunctionComponent = () => (
  <Page topOffset header={<Header />} footer={<Footer />}>
    <PageHeader title='Обучение' align='center' />

    <NoLearning />
  </Page>
);
