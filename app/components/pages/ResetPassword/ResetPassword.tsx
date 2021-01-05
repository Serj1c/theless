import React, { useCallback, useState } from 'react';
import { AuthLayout } from 'components/layouts';
import { Button, Form, Input } from 'components/ui';

export const ResetPassword: React.FunctionComponent = () => {
  const [password, setPassword] = useState('');

  /** Input change handler */
  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    ({ target }) => {
      setPassword(target.value);
    },
    []
  );

  /** Form submit handler */
  const handleSubmit = useCallback<React.FormEventHandler<HTMLFontElement>>(
    (event) => {
      event.preventDefault();
    },
    []
  );

  return (
    <AuthLayout>
      <Form title='Восстановление пароля' narrow onSubmit={handleSubmit}>
        <Form.Row label='Новый пароль'>
          <Input
            type='password'
            name='password'
            value={password}
            placeholder='Придумайте пароль'
            onChange={handleChange}
          />
        </Form.Row>

        <Form.ActionRow>
          <Button type='submit' design='primary' fullWidth>
            Восстановить
          </Button>
        </Form.ActionRow>
      </Form>
    </AuthLayout>
  );
};
