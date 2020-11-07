import React from 'react';
import { NextPage } from 'next';
import { AddEventPage } from 'components/pages';

const AddEventPageComponent: NextPage = () => <AddEventPage />;

// NOTE Temporary fix to disable static rendering
export const getServerSideProps = async () => {
  return;
};

export default AddEventPageComponent;
