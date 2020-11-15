import React from 'react';
import Head from 'next/head';
import { Grid, Header } from 'components/ui';
import { TITLE_PREFIX } from 'constants/common';

interface Props {
  title: string;
}

export const PageHeader: React.FunctionComponent<Props> = ({ title }) => (
  <>
    {/* Render page meta */}
    <Head>
      <title>
        {TITLE_PREFIX}
        {title}
      </title>
    </Head>

    {/* Render page header */}
    <Grid.Row margin='none'>
      <Grid.Col>
        <Header level={1}>{title}</Header>
      </Grid.Col>
    </Grid.Row>
  </>
);
