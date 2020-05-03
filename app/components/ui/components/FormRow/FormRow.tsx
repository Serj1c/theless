import React, { memo } from 'react';
import Row from '../Row/Row';
import Col from '../Col/Col';
import Text from '../Text/Text';
import Paragraph from '../Paragraph/Paragraph';

type Size = 's' | 'm' | 'l';

export interface Props {
    children: React.ReactNode;
    size?: Size;
    label?: string;
    htmlFor?: string;
    error?: string;
    center?: boolean;
}

const FormRow = ({ children, size, label, htmlFor, error, center }: Props): JSX.Element => {
    const labelCols = label ? 4 : undefined;
    const contentCols = label ? 8 : 12;

    return (
        <Row>
            {Boolean(label) && (
                <Col
                    cols={12}
                    colsSM={labelCols}
                    marginBottom='s'>
                    <label htmlFor={htmlFor}>
                        <Text>
                            {label}
                        </Text>
                    </label>
                </Col>
            )}
            <Col
                cols={12}
                colsSM={contentCols}>
                {children}
                {/* Error text */}
                {Boolean(error) && (
                    <label htmlFor={htmlFor}>
                        <Paragraph color='danger' margin='none' align={center ? 'center' : 'left'}>
                            {error}
                        </Paragraph>
                    </label>
                )}
            </Col>
        </Row>
    );
};

FormRow.defaultProps = {
    size: 'm',
};

export default memo(FormRow);
