import React, { memo } from 'react';
import classNames from 'classnames';
import { Container, Row, Col, Paragraph, Link } from 'components/ui';
import styles from './Footer.module.css';

const EMAIL = 'info@theless.com';
const START_YEAR = 2020;

const getYears = (): string => {
    const now = new Date();
    const currentYear = now.getFullYear();

    if (currentYear > START_YEAR) {
        return `${START_YEAR}–${currentYear}`;
    }

    return String(START_YEAR);
}

interface Props {
    withPadding?: boolean;
}

const Footer = ({ withPadding }: Props) => {
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
                                <Link
                                    href={`mailto:${EMAIL}`}>
                                    {EMAIL}
                                </Link>
                            </Paragraph>
                            <Paragraph align='center'>
                                © {getYears()} Less
                            </Paragraph>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default memo(Footer);
