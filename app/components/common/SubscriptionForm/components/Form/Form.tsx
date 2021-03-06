import React, { useCallback, useState } from 'react';
import { Button, Form, Input } from 'components/ui';
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

const FormComponent = ({
  onSubmit,
  isFetching,
  title,
  errors,
  error,
}: Props): JSX.Element => {
  const [email, setEmail] = useState<string>('');

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setEmail(event.target.value);
    },
    []
  );

  // TODO Fix this stuff with out email field in second param
  const handleSubmit: React.FormEventHandler = useCallback(
    (event): void => {
      event.preventDefault();
      onSubmit({ email });
    },
    [email]
  ); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Form error={error} narrow title={title} onSubmit={handleSubmit}>
      <div className={styles.inputs}>
        <Form.Row error={errors && errors.email} center>
          <Input
            size='l'
            textAlign='center'
            placeholder='Введите ваш email'
            value={email}
            disabled={isFetching}
            onChange={handleChange}
          />
        </Form.Row>
        <Form.Row>
          <Button
            design='primary'
            size='l'
            fullWidth
            type='submit'
            loading={isFetching}
          >
            Подписаться
          </Button>
        </Form.Row>
      </div>
    </Form>
  );
};

export default FormComponent;
