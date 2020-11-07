import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { TITLE_PREFIX } from 'constants/common';
import { Favorite } from 'components/pages/profile';

const FavoritePage: NextPage = () => (
  <>
    {/* Render page meta */}
    <Head>
      <title>{TITLE_PREFIX}Избранное</title>
    </Head>

    {/* Render page content */}
    <Favorite />
  </>
);

// NOTE Temporary fix to disable static rendering
export const getServerSideProps = async () => {
  return;
};

export default FavoritePage;
