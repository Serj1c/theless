import React, {
  ChangeEventHandler,
  useCallback,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { Button, Form, Input } from 'components/ui';
import { AuthLayout } from 'components/layouts';

export const AuthPage: React.FunctionComponent = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>();
  const router = useRouter();

  /** Input change handler */
  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target }) => {
      setEmail(target.value);

      if (error && target.value) {
        setError(null);
      }
    },
    [error]
  );

  /** Handle login and signup buttons click */
  const handleButtonClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(
    (event) => {
      if (!email) {
        emailRef.current.focus();
        setError('Введите вам email');

        return;
      }

      if (event.target instanceof HTMLButtonElement) {
        router.push(`/auth/${event.target.name}`);
      }
    },
    [email]
  );

  /** Handle form submit */
  const handleFormSubmit = useCallback<React.FormEventHandler<HTMLFontElement>>(
    (event) => {
      event.preventDefault();

      if (!email) {
        emailRef.current.focus();
        setError('Введите вам email');

        return;
      }

      if (event.target instanceof HTMLButtonElement) {
        router.push(`/auth/${event.target.name}`);
      }
    },
    []
  );

  return (
    <AuthLayout>
      <Form title='Вход' narrow onSubmit={handleFormSubmit}>
        <Form.Row label='Email' error={error}>
          <Input
            ref={emailRef}
            name='email'
            value={email}
            autoFocus
            placeholder='Введите email'
            onChange={handleChange}
          />
        </Form.Row>

        <Form.ActionRow>
          <Button
            type='submit'
            name='login'
            design='primary'
            fullWidth
            onClick={handleButtonClick}
          >
            Войти
          </Button>
        </Form.ActionRow>

        <Form.Row>
          <Button
            type='button'
            design='secondary'
            name='signup'
            fullWidth
            onClick={handleButtonClick}
          >
            Зарегистрироваться
          </Button>
        </Form.Row>
      </Form>
    </AuthLayout>
  );
};
