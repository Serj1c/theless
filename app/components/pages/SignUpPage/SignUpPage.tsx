import React, { useCallback, useState } from 'react';
import { Form, Input, Button } from 'components/ui';
import { AuthLayout } from 'components/layouts';

interface FormData {
  email: string;
  password: string;
}

const initialFormData: FormData = {
  email: '',
  password: '',
};

export const SignUpPage: React.FunctionComponent = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  /** Input change handler */
  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    ({ target }) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [target.name]: target.value,
      }));
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
      <Form title='Регистрация' narrow onSubmit={handleSubmit}>
        <Form.Row label='Email'>
          <Input
            name='email'
            value={formData.email}
            placeholder='Введите email'
            onChange={handleChange}
          />
        </Form.Row>

        <Form.Row label='Пароль'>
          <Input
            type='password'
            name='password'
            value={formData.password}
            placeholder='Придумайте пароль'
            onChange={handleChange}
          />
        </Form.Row>

        <Form.ActionRow>
          <Button type='submit' fullWidth design='secondary'>
            Зарегистрироваться
          </Button>
        </Form.ActionRow>
      </Form>
    </AuthLayout>
  );
};
