import React from 'react';
import Head from 'next/head';
import { Col, Header, Row } from 'components/ui';
import { TITLE_PREFIX } from 'constants/common';

interface Props {
  title: string;
}

const PageHeader = ({ title }: Props): JSX.Element => (
  <>
    {/* Render page meta */}
    <Head>
      <title>
        {TITLE_PREFIX} {title}
      </title>
    </Head>

    {/* Render page header */}
    <Row>
      <Col>
        <Header level={1}>{title}</Header>
      </Col>
    </Row>
  </>
);

export default PageHeader;
