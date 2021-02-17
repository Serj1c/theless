import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthLayout } from 'components/layouts';
import { Button, Form, Input } from 'components/ui';
import { HOMEPAGE_URL } from 'constants/common';
import { ERROR_MESSAGE_OTHER } from 'constants/errors';
import { axios, isAxiosError } from 'utils';

interface ErrorPayload {
  errors?: {
    email?: string;
  };
}

interface Props {
  title: string;
  token: string;
}

export const ResetPage: React.FunctionComponent<Props> = ({ title, token }) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [commonError, setCommonError] = useState<string | null>(null);
  const [focus, setFocus] = useState<boolean>(true);
  const router = useRouter();

  // Flush focus for future times
  useEffect(() => {
    if (!focus) {
      return;
    }

    const timerId = setTimeout(() => {
      setFocus(false);
    }, 0);

    return () => {
      clearTimeout(timerId);
    };
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

      // Validate form
      if (!password) {
        setError('Введите новый пароль');
        setFocus(true);

        return;
      }

      // Update state of component
      setIsFetching(true);
      setCommonError(null);

      // Making request
      try {
        await axios.post('/auth/reset-password', { password, token });

        await router.push(HOMEPAGE_URL);
      } catch (err: unknown) {
        if (
          isAxiosError<ErrorPayload>(err) &&
          err.response.data?.errors?.email
        ) {
          setError(err.response.data.errors.email);
        } else {
          setCommonError(ERROR_MESSAGE_OTHER);
        }
      }

      setIsFetching(false);
    },
    [password, token]
  );

  return (
    <AuthLayout>
      <Form title={title} narrow error={commonError} onSubmit={handleSubmit}>
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
