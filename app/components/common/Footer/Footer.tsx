import React from 'react';
import classNames from 'classnames';
import { Col, Container, Link, Paragraph, Row } from 'components/ui';
import { EMAIL } from 'constants/common';
import { getYears } from './utils';
import styles from './Footer.module.css';

interface Props {
  withPadding?: boolean;
}

export const Footer: React.FunctionComponent<Props> = ({ withPadding }) => {
  const className = classNames(styles.root, {
    [styles['root_with-padding']]: withPadding,
  });

  return (
    <div className={className}>
      <Container>
        <Row>
          <Col align='center'>
            <div>
              <Paragraph align='center'>
                <Link href={`mailto:${EMAIL}`}>{EMAIL}</Link>
              </Paragraph>
              <Paragraph align='center'>© {getYears()} Less</Paragraph>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
