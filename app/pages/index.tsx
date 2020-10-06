import React, { useEffect } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import Router from 'next/router';
import { HOMEPAGE_URL } from 'constants/common';

const HomePage: NextPage = (): null => {
  useEffect(() => {
    Router.replace(HOMEPAGE_URL);
  }, []);

  return null;
};

export const getServerSideProps: GetServerSideProps<{}> = async ({ res }) => {
  res.writeHead(301, { Location: HOMEPAGE_URL });
  res.end();

  return { props: {} };
};

export default HomePage;
