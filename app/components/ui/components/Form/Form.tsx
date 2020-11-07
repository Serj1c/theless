import React from 'react';
import { Row } from '../Row';
import { Col } from '../Col';
import { Header } from '../Header';
import { Paragraph } from '../Paragraph';
import styles from './Form.module.css';

interface Props {
  children: React.ReactNode;
  title?: string;
  error?: string;
  narrow?: boolean;
  onSubmit?: React.FormEventHandler;
}

export const Form: React.FunctionComponent<Props> = ({
  children,
  title,
  error,
  narrow,
  onSubmit,
}) => (
  <form className={styles.root} onSubmit={onSubmit}>
    {Boolean(title) && (
      <Row marginBottom='l'>
        <Col cols={12} colsSM={narrow ? 12 : 8} offsetSM={narrow ? 0 : 4}>
          <Header level={2} margin='none' align={narrow ? 'center' : undefined}>
            {title}
          </Header>
          {error && (
            <Paragraph color='danger' align={narrow ? 'center' : 'left'}>
              {error}
            </Paragraph>
          )}
        </Col>
      </Row>
    )}
    {children}
  </form>
);
