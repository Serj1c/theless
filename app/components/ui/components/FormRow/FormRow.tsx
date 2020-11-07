import React from 'react';
import { Row } from '../Row';
import { Col } from '../Col';
import { Text } from '../Text';
import { Paragraph } from '../Paragraph';

export interface Props {
  children: React.ReactNode;
  label?: string;
  htmlFor?: string;
  error?: string;
  center?: boolean;
}

export const FormRow: React.FunctionComponent<Props> = ({
  children,
  label,
  htmlFor,
  error,
  center,
}) => {
  const labelCols = label ? 4 : undefined;
  const contentCols = label ? 8 : 12;

  return (
    <Row>
      {Boolean(label) && (
        <Col cols={12} colsSM={labelCols} marginBottom='s'>
          <label htmlFor={htmlFor}>
            <Text>{label}</Text>
          </label>
        </Col>
      )}

      <Col cols={12} colsSM={contentCols}>
        {children}
        {/* Error text */}
        {Boolean(error) && (
          <label htmlFor={htmlFor}>
            <Paragraph
              color='danger'
              margin='none'
              align={center ? 'center' : 'left'}
            >
              {error}
            </Paragraph>
          </label>
        )}
      </Col>
    </Row>
  );
};
