import React from 'react';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSideProps, NextPage } from 'next';
import Error from 'next/error';
import EventPage from 'components/pages/EventPage/EventPage';
import { EventModel } from 'models/EventModel';
import jsonrpc from 'utils/jsonrpc';

interface Params extends ParsedUrlQuery {
  event: string;
  location: string;
}

interface Props {
  item?: EventModel;
  error?: string;
}

const EventPageComponent: NextPage<Props> = ({ item, error }) => {
  if (error) {
    return <Error statusCode={404} title={error} />;
  }

  return <EventPage item={item} />;
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  const { event, location } = params;
  let result: {
    item: EventModel;
  };

  try {
    result = await jsonrpc.request('Events.GetV1', {
      locationSlug: location,
      eventSlug: event,
    });

    return {
      props: {
        item: result.item,
      },
    };
  } catch (error) {
    // TODO Log in Sentry
    return {
      props: {
        // TODO Fix error shape
        error: error.message,
      },
    };
  }
};

export default EventPageComponent;
