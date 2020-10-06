import React, { memo } from 'react';
import { FullWidthCol, Row } from 'components/ui';
import styles from './Cover.module.css';

interface Props {
  img: string;
}

const Cover = ({ img }: Props): JSX.Element => (
  <Row margin='none'>
    <FullWidthCol>
      <div className={styles.root}>
        <img className={styles.img} src={img} alt='' />
      </div>
    </FullWidthCol>
  </Row>
);

export default memo(Cover);
