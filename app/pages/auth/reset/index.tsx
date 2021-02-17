import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import ErrorPage from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ResetPage as Page } from 'components/pages';
import { TITLE_PREFIX } from 'constants/common';

const TITLE = 'Сброс пароля';

const SignUpPage: NextPage = () => {
  const { query } = useRouter();
  const { token } = query;

  // Don't show form if don't have a token
  if (!token || typeof token !== 'string') {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      {/* Render page meta */}
      <Head>
        <title>
          {TITLE_PREFIX}
          {TITLE}
        </title>
      </Head>

      {/* Render page content */}
      <Page title={TITLE} token={token} />
    </>
  );
};

/**
 * SSR initialisation
 */
export const getServerSideProps: GetServerSideProps = async () => ({
  props: {},
});

export default SignUpPage;
