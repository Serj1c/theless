import React from 'react';
import { NextPage } from 'next';
import ErrorPage from 'next/error';

const LocationPage: NextPage = (): JSX.Element => {
    return <ErrorPage statusCode={404} />
}

export default LocationPage;
