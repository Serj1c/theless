import React from 'react';
import Head from 'next/head';
import { Grid, Header } from 'components/ui';
import { TITLE_PREFIX } from 'constants/common';

interface Props {
  align?: 'left' | 'center';
  title: string;
}

export const PageHeader: React.FunctionComponent<Props> = ({
  align = 'left',
  title,
}) => (
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
      <Grid.Col align={align}>
        <Header level={1}>{title}</Header>
      </Grid.Col>
    </Grid.Row>
  </>
);
