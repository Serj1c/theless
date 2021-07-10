import React from 'react';
import { NextPage } from 'next';
import { LoginPage as Page } from 'components/pages';
import Head from 'next/head';
import { TITLE_PREFIX } from 'constants/common';

const LoginPage: NextPage = () => (
  <>
    {/* Render page meta */}
    <Head>
      <title>{TITLE_PREFIX} Login</title>
    </Head>

    {/* Render page content */}
    <Page />
  </>
);

export default LoginPage;
