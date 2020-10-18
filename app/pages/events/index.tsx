import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import ErrorPage from 'next/error';
import { axios } from 'utils';
import { EventsPage } from 'components/pages';
import { EventModel } from 'models';

interface Props {
  list?: EventModel[];
  error?: {
    code: number;
    message: string;
  };
}

/**
 * EventPageComponent component
 */
const EventPageComponent: NextPage<Props> = ({ list, error }) => {
  if (error) {
    return <ErrorPage statusCode={error.code} title={error.message} />;
  }

  return <EventsPage title='Ближайшие спортивные события' list={list} />;
};

/**
 * SSR initialisation
 */
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const { data } = await axios.get<EventModel[]>('/events');

    return {
      props: {
        list: data || [],
      },
    };
  } catch (_) {
    // TODO Log into Sentry
    // TODO Handle all kind of errors

    return {
      props: {
        error: {
          code: 404,
          message: 'Локация не найдена',
        },
      },
    };
  }
};

export default EventPageComponent;
