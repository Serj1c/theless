import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { Favorite } from 'components/pages/profile';
import { axios } from 'utils';
import { FavoriteModel } from 'models';

interface Props {
  list?: FavoriteModel[];
}

const FavoritePage: NextPage<Props> = ({ list }) => <Favorite list={list} />;

/**
 * SSR initialisation
 */
export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
}) => {
  try {
    const { data = [] } = await axios.get<FavoriteModel[]>('/favorites', {
      headers: {
        Cookie: req.headers.cookie || '',
      },
    });

    return {
      props: {
        list: data,
      },
    };
  } catch (_) {
    // TODO Log into Sentry
    // TODO Implement error handling
    return {
      props: {
        list: [],
      },
    };
  }
};

export default FavoritePage;
