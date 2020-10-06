import React from 'react';
import { FullWidthCol, Row } from 'components/ui';
import { Map } from 'components/common';

interface Props {
  coordinates: [number, number];
}

const MapSection = ({ coordinates }: Props): JSX.Element => (
  <Row margin='xl'>
    <FullWidthCol>
      <Map coords={coordinates} />
    </FullWidthCol>
  </Row>
);

export default MapSection;
