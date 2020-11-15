import React from 'react';
import { Grid, Paragraph } from 'components/ui';
import Icon from './resources/icon.svg';
import styles from './Success.module.css';

const Success = (): JSX.Element => (
  <Grid.Row>
    <Grid.Col>
      <div className={styles.root}>
        <Icon className={styles.icon} />
        <Paragraph size='l' marginTop='l' align='center'>
          Как будет что-то новое мы&nbsp;дадим знать
        </Paragraph>
      </div>
    </Grid.Col>
  </Grid.Row>
);

export default Success;
