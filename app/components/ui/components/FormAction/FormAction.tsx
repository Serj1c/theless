import React, { memo } from 'react';
import Row from '../Row/Row';
import Col from '../Col/Col';

export interface Props {
    children: React.ReactNode;
}

const FormAction = ({ children }: Props): JSX.Element => (
    <Row>
        <Col
            cols={12}
            colsSM={8}
            offsetSM={4}>
            {children}
        </Col>
    </Row>
);

export default memo(FormAction);
