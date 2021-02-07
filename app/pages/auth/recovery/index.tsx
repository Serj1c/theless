import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { RecoveryPage as Page } from 'components/pages';
import { TITLE_PREFIX } from 'constants/common';

const SignUpPage: NextPage = () => (
  <>
    {/* Render page meta */}
    <Head>
      <title>{TITLE_PREFIX}Сброс пароля</title>
    </Head>

    {/* Render page content */}
    <Page />
  </>
);

export default SignUpPage;
