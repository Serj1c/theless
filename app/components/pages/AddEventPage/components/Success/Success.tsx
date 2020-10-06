import React from 'react';
import { Link, Header, Paragraph } from 'components/ui';
import { HOMEPAGE_URL } from 'constants/common';
import Icon from './resources/icon.svg';
import styles from './Success.module.css';

const Success = (): JSX.Element => (
  <div className={styles.root}>
    <Icon className={styles.icon} />
    <Header align='center'>Событие добавлено</Header>
    <Paragraph align='center' marginBottom='xl'>
      Спасибо, после прохождения модерации оно появиться на сайте.
    </Paragraph>
    <Paragraph align='center'>
      <Link href={HOMEPAGE_URL}>На главную</Link>
    </Paragraph>
  </div>
);

export default Success;
