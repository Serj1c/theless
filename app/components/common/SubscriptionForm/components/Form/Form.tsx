import React, { memo, useCallback, useState } from 'react';
import { Input, Button, Form, FormRow } from 'components/ui';
import styles from './Form.module.css';

interface Props {
    title: string;
    isFetching: boolean;
    errors?: ErrorsField;
    error?: string;
    onSubmit: (params: OnSubmitParams) => void;
}

interface ErrorsField {
    email?: string;
}

export interface OnSubmitParams {
    email: string;
}

const FormComponent = ({ onSubmit, isFetching, title, errors }: Props): JSX.Element => {
    const [email, setEmail] = useState<string>('');

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value);
    }, []);

    // TODO Fix this stuff with out email field in second param
    const handleSubmit: React.FormEventHandler = useCallback((event): void => {
        event.preventDefault();
        onSubmit({ email });
    }, [email]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Form
            narrow
            title={title}
            onSubmit={handleSubmit}>
            <div className={styles.inputs}>
                <FormRow error={errors && errors.email} center>
                    <Input
                        size='l'
                        textAlign='center'
                        placeholder='Введите ваш email'
                        value={email}
                        disabled={isFetching}
                        onChange={handleChange} />
                </FormRow>
                <FormRow>
                    <Button
                        design='danger'
                        size='l'
                        fullWidth
                        type='submit'
                        loading={isFetching}>
                        Подписаться
                    </Button>
                </FormRow>
            </div>
        </Form>
    );
};

export default memo(FormComponent);
