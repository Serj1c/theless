import React, { useContext } from 'react';
import { Grid } from '../../../Grid';
import { Text } from '../../../Text';
import { Paragraph } from '../../../Paragraph';
import { context } from '../../Form';

export interface Props {
  children: React.ReactNode;
  label?: string;
  htmlFor?: string;
  error?: string;
  center?: boolean;
}

export const Row: React.FunctionComponent<Props> = ({
  children,
  label,
  htmlFor,
  error,
  center,
}) => {
  const { narrow } = useContext(context);
  const cols = 12;
  const labelCols = narrow ? 12 : label ? 4 : undefined;
  const contentCols = narrow ? 12 : label ? 8 : 12;

  return (
    <Grid.Row>
      {Boolean(label) && (
        <Grid.Col cols={cols} colsSM={labelCols} marginBottom='s'>
          <label htmlFor={htmlFor}>
            <Text>{label}</Text>
          </label>
        </Grid.Col>
      )}

      <Grid.Col cols={cols} colsSM={contentCols}>
        {children}

        {/* Error text */}
        {Boolean(error) && (
          <label htmlFor={htmlFor}>
            <Paragraph
              color='caution'
              margin='none'
              align={center ? 'center' : 'left'}
            >
              {error}
            </Paragraph>
          </label>
        )}
      </Grid.Col>
    </Grid.Row>
  );
};
