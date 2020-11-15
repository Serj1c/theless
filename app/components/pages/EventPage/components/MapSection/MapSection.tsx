import React from 'react';
import { FullWidthCol, Grid } from 'components/ui';
import { Map } from 'components/common';

interface Props {
  coordinates: [number, number];
}

export const MapSection: React.FunctionComponent<Props> = ({ coordinates }) => (
  <Grid.Row margin='xl' noGutter>
    <FullWidthCol>
      <Map coords={coordinates} />
    </FullWidthCol>
  </Grid.Row>
);
