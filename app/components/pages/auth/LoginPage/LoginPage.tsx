import React, {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { Button, Form, Input, Link, Text } from 'components/ui';
import { AuthLayout } from 'components/layouts';
import { HOMEPAGE_URL } from 'constants/common';

interface FormData {
  [k: string]: string;
  email: string;
  password: string;
}

interface FormErrors {
  [k: string]: string;
  email?: string;
  password?: string;
}

const initFormData: FormData = {
  email: '',
  password: '',
};

const initFormErrors: FormErrors = {};

export const LoginPage: React.FunctionComponent = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(initFormData);
  const [formErrors, setFormErrors] = useState<FormErrors>(initFormErrors);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  // TODO Setup init value
  const [focus, setFocus] = useState<'email' | 'password' | undefined>(
    !formData.email ? 'email' : 'password'
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

      // Update form value
      setFormData((v) => ({
        ...v,
        [name]: value,
      }));

      // Flush error if exist and value changed
      if (formErrors[name] && value) {
        setFormErrors((v) => ({ ...v, [name]: undefined }));
      }
    },
    [formErrors]
  );

  /** Form submit handler */
  const handleSubmit = useCallback<React.FormEventHandler<HTMLFontElement>>(
    async (event) => {
      event.preventDefault();

      const { email, password } = formData;

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

      // TODO Implement
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          router.push(HOMEPAGE_URL);
          resolve();
        }, 200 + Math.random() * 800);
      });

      setIsFetching(false);
    },
    [formData]
  );

  return (
    <AuthLayout>
      <Form title='Вход' narrow onSubmit={handleSubmit}>
        <Form.Row label='Email' error={formErrors.email}>
          <Input
            name='email'
            value={formData.email}
            autoFocus={focus === 'email'}
            placeholder='Введите email'
            onChange={handleChange}
          />
        </Form.Row>

        <Form.Row label='Пароль' error={formErrors.password}>
          <Input
            type='password'
            name='password'
            value={formData.password}
            autoFocus={focus === 'password'}
            placeholder='Введите пароль'
            onChange={handleChange}
          />
        </Form.Row>

        <Form.Row>
          {/* TODO Improve */}
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
