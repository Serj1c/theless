import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Error from 'next/error';
import { ParsedUrlQuery } from 'querystring';
import { EventPage } from 'components/pages';
import { EventModel } from 'models/EventModel';
import { axios } from 'utils';

interface Params extends ParsedUrlQuery {
  event: string;
  location: string;
}

interface Props {
  item?: EventModel;
  error?: boolean;
}

/**
 * Event page component
 */
const EventPageComponent: NextPage<Props> = ({ item, error }) => {
  if (error) {
    return <Error statusCode={404} title={'Событие не найдено'} />;
  }

  return <EventPage item={item} />;
};

/**
 * SSR initialisation
 */
export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  const { event, location } = params;

  try {
    const { data } = await axios.get<EventModel>(
      `/locations/${location}/events/${event}`
    );

    return {
      props: {
        item: data,
      },
    };
  } catch (error) {
    // TODO Log in Sentry
    return {
      props: {
        error: true,
      },
    };
  }
};

export default EventPageComponent;
