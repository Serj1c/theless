import React, { useCallback, useEffect, useState } from 'react';
import { AuthLayout } from 'components/layouts';
import { Button, Form, Input } from 'components/ui';
import { useRouter } from 'next/router';
import { HOMEPAGE_URL } from '../../../../constants/common';

export const RecoveryPage: React.FunctionComponent = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [focus, setFocus] = useState<boolean>(true);
  const router = useRouter();

  // Flush focus for future times
  useEffect(() => {
    setTimeout(() => {
      setFocus(false);
    }, 0);
  }, [focus]);

  /** Input change handler */
  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    ({ target }) => {
      setPassword(target.value);

      // Flush error if exist and password is not empty
      if (error && target.value) {
        setError(null);
      }
    },
    [error]
  );

  /** Form submit handler */
  const handleSubmit = useCallback<React.FormEventHandler<HTMLFontElement>>(
    async (event) => {
      event.preventDefault();

      if (!password) {
        setError('Введите новый пароль');
        setFocus(true);

        return;
      }

      setIsFetching(true);

      // TODO implement
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(undefined);
        }, 200 + Math.random() * 800);
      });

      await router.push(HOMEPAGE_URL);
    },
    [password]
  );

  return (
    <AuthLayout>
      <Form title='Восстановление пароля' narrow onSubmit={handleSubmit}>
        <Form.Row label='Новый пароль' error={error}>
          <Input
            type='password'
            name='password'
            value={password}
            placeholder='Придумайте пароль'
            autoFocus={focus}
            onChange={handleChange}
          />
        </Form.Row>

        <Form.ActionRow>
          <Button type='submit' design='primary' fullWidth loading={isFetching}>
            Восстановить
          </Button>
        </Form.ActionRow>
      </Form>
    </AuthLayout>
  );
};
