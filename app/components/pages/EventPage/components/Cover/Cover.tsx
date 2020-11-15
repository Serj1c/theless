import React from 'react';
import { FullWidthCol, Grid } from 'components/ui';
import styles from './Cover.module.css';

interface Props {
  img: string;
}

export const Cover: React.FunctionComponent<Props> = ({ img }) => (
  <Grid.Row margin='none' noGutter>
    <FullWidthCol>
      <div className={styles.root}>
        <img className={styles.img} src={img} alt='' />
      </div>
    </FullWidthCol>
  </Grid.Row>
);
