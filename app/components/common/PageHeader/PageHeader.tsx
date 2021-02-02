import React from 'react';
import Head from 'next/head';
import { Grid, Header } from 'components/ui';
import { TITLE_PREFIX } from 'constants/common';

interface Props {
  align?: 'left' | 'center';
  title: string;
  image?: string;
  description?: string;
}

export const PageHeader: React.FunctionComponent<Props> = ({
  align = 'left',
  title,
  image,
  description,
}) => (
  <>
    {/* Render page meta */}
    <Head>
      <title>
        {TITLE_PREFIX}
        {title}
      </title>
      {image && description && (
        <>
          <meta name='twitter:card' content='summary_large_image' />
          <meta property='og:title' content={title} />
          <meta property='og:description' content={description} />
          <meta property='og:image' content={image} />
        </>
      )}
    </Head>

    {/* Render page header */}
    <Grid.Row margin='none'>
      <Grid.Col align={align}>
        <Header level={1}>{title}</Header>
      </Grid.Col>
    </Grid.Row>
  </>
);
