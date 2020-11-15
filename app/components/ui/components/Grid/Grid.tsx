import React from 'react';
import { Col, Row } from './components';

export const Grid: React.FunctionComponent & {
  Row: typeof Row;
  Col: typeof Col;
} = () => {
  throw new Error("Grid component isn't implemented");
};

Grid.Row = Row;
Grid.Col = Col;
