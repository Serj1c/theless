import React, { ChangeEventHandler, useCallback, useState } from 'react';
import { Form, Input, Button } from 'components/ui';
import { AuthLayout } from 'components/layouts';

export const LoginPage: React.FunctionComponent = () => {
  const [email, setEmail] = useState('');

  /** Input change handler */
  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target }) => {
      setEmail(target.value);
    },
    []
  );

  return (
    <AuthLayout>
      <Form title='Вход' narrow>
        <Form.Row label='Email'>
          <Input
            name='email'
            value={email}
            placeholder='Введите email'
            onChange={handleChange}
          />
        </Form.Row>

        <Form.ActionRow>
          <Button type='button' design='primary' fullWidth>
            Войти
          </Button>
        </Form.ActionRow>

        <Form.Row>
          <Button type='button' design='secondary' fullWidth>
            Зарегистрироваться
          </Button>
        </Form.Row>
      </Form>
    </AuthLayout>
  );
};
