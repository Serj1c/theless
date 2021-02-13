import React, {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { useUser } from 'components/providers';
import { AuthLayout } from 'components/layouts';
import { Button, Form, Input, Link, Text } from 'components/ui';
import { HOMEPAGE_URL } from 'constants/common';
import { ERROR_MESSAGE_OTHER } from 'constants/errors';
import { axios, isAxiosError } from 'utils';

interface ErrorPayload {
  error?: string;
}

interface FormErrors {
  [k: string]: string;
  email?: string;
  password?: string;
}

const initFormErrors: FormErrors = {};

export const LoginPage: React.FunctionComponent = () => {
  const router = useRouter();
  const { email, setEmail } = useUser();
  const [password, setPassword] = useState<string>('');
  const [formErrors, setFormErrors] = useState<FormErrors>(initFormErrors);
  const [formError, setFromError] = useState<string | undefined>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [focus, setFocus] = useState<'email' | 'password' | undefined>(
    !email ? 'email' : 'password'
  );

  // Flush focus for future times
  useEffect(() => {
    setTimeout(() => {
      setFocus(undefined);
    }, 0);
  }, [focus]);

  /** Input change handler */
  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target }) => {
      const { name, value } = target;

      // Flush error if exist and value changed
      if (formErrors[name] && value) {
        setFormErrors((v) => ({ ...v, [name]: undefined }));
      }

      // Setting up email into user provider
      if (name === 'email') {
        setEmail(value);

        return;
      }

      if (name === 'password') {
        setPassword(value);
      }
    },
    [formErrors]
  );

  /** Form submit handler */
  const handleSubmit = useCallback<React.FormEventHandler<HTMLFontElement>>(
    async (event) => {
      event.preventDefault();

      // Some of the fields are empty, show errors and set focus
      if (!email || !password) {
        setFormErrors({
          email: !email ? 'Введите email' : undefined,
          password: !password ? 'Введите пароль' : undefined,
        });

        setFocus(!email ? 'email' : 'password');

        return;
      }

      setIsFetching(true);

      try {
        await axios.post('/auth/login', { email, password });

        setFromError(undefined);

        await router.push(HOMEPAGE_URL);
      } catch (err: unknown) {
        if (isAxiosError<ErrorPayload>(err) && err.response.data.error) {
          setFromError(err.response.data.error);
        } else {
          setFromError(ERROR_MESSAGE_OTHER);
        }
      }

      setIsFetching(false);
    },
    [email, password]
  );

  return (
    <AuthLayout>
      <Form title='Вход' error={formError} narrow onSubmit={handleSubmit}>
        <Form.Row label='Email' error={formErrors.email}>
          <Input
            name='email'
            value={email}
            autoFocus={focus === 'email'}
            placeholder='Введите email'
            onChange={handleChange}
          />
        </Form.Row>

        <Form.Row label='Пароль' error={formErrors.password}>
          <Input
            type='password'
            name='password'
            value={password}
            autoFocus={focus === 'password'}
            placeholder='Введите пароль'
            onChange={handleChange}
          />
        </Form.Row>

        <Form.Row>
          <Text size='m'>
            <Link href='/auth/forget' color='dark'>
              Не помню пароль
            </Link>
          </Text>
        </Form.Row>

        <Form.ActionRow>
          <Button type='submit' design='primary' fullWidth loading={isFetching}>
            Войти
          </Button>
        </Form.ActionRow>
      </Form>
    </AuthLayout>
  );
};
