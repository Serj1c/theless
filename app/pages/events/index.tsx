import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import ErrorPage from 'next/error';
import { EventsPage } from 'components/pages';
import { EventModel } from 'models';
import jsonrpc from 'utils/jsonrpc';

interface Props {
  list?: EventModel[];
  error?: {
    code: number;
    message: string;
  };
}

const EventPageComponent: NextPage<Props> = ({ list, error }): JSX.Element => {
  if (error) {
    return <ErrorPage statusCode={error.code} title={error.message} />;
  }

  return <EventsPage title='Ближайшие спортивные события' list={list} />;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  let list: EventModel[];

  try {
    list = await jsonrpc.request<EventModel[]>('Events.GetListV1');

    return {
      props: {
        list: list || [],
      },
    };
  } catch (error) {
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
