import React from 'react';
import { Row } from '../Row';
import { Col } from '../Col';

export interface Props {
  children: React.ReactNode;
}

export const FormAction: React.FunctionComponent<Props> = ({ children }) => (
  <Row>
    <Col cols={12} colsSM={8} offsetSM={4}>
      {children}
    </Col>
  </Row>
);
