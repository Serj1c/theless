import React, { useContext } from 'react';
import { Grid } from '../../../Grid';
import { context } from '../../Form';

export interface Props {
  children: React.ReactNode;
}

export const ActionRow: React.FunctionComponent<Props> = ({ children }) => {
  const { narrow } = useContext(context);
  const cols = 12;
  const colsSM = narrow ? 12 : 8;
  const offsetSM = narrow ? 0 : 4;

  return (
    <Grid.Row marginTop='l'>
      <Grid.Col cols={cols} colsSM={colsSM} offsetSM={offsetSM}>
        {children}
      </Grid.Col>
    </Grid.Row>
  );
};
