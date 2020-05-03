import React from 'react';
import Row from '../Row/Row';
import Col from '../Col/Col';
import Header from '../Header/Header';
import Paragraph from '../Paragraph/Paragraph';
import styles from './Form.module.css';

interface Props {
    children: React.ReactNode;
    title?: string;
    error?: string;
    narrow?: boolean;
    onSubmit?: React.FormEventHandler;
}

const Form = ({ children, title, error, narrow, onSubmit }: Props): JSX.Element => (
    <form className={styles.root} onSubmit={onSubmit}>
        {Boolean(title) && (
            <Row marginBottom='l'>
                <Col
                    cols={12}
                    colsSM={narrow ? 12 : 8}
                    offsetSM={narrow ? 0 : 4}>
                    <Header
                        level={2}
                        margin='none'
                        align={narrow ? 'center' : undefined}>
                        {title}
                    </Header>
                    {error && (
                        <Paragraph color='danger'>{error}</Paragraph>
                    )}
                </Col>
            </Row>
        )}
        {children}
    </form>
);

export default Form;
