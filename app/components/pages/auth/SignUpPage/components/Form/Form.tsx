import React, { useCallback, useEffect, useState } from 'react';
import { Button, Input, Form as FormComponent } from 'components/ui';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  [k: string]: string;
  email?: string;
  password?: string;
}

interface OnChangeParams {
  name: string;
  value: string;
}

interface Props {
  data: FormData;
  onChange: (params: OnChangeParams) => void;
  onNext: () => void;
}

export const Form: React.FunctionComponent<Props> = ({
  data,
  onChange,
  onNext,
}) => {
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [focus, setFocus] = useState<'email' | 'password' | undefined>(
    !data.email ? 'email' : 'password'
  );

  // Flush focus for future times
  useEffect(() => {
    setTimeout(() => {
      setFocus(undefined);
    }, 0);
  }, [focus]);

  /** Input change handler */
  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    ({ target }) => {
      const { name, value } = target;

      onChange({ name, value });

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

      const { email, password } = data;

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
          resolve();
        }, 200 + Math.random() * 800);
      });

      setIsFetching(false);

      // Go to the next step
      onNext();
    },
    [data]
  );

  return (
    <FormComponent title='Регистрация' narrow onSubmit={handleSubmit}>
      <FormComponent.Row label='Email' error={formErrors.email}>
        <Input
          name='email'
          value={data.email}
          autoFocus={focus === 'email'}
          placeholder='Введите email'
          onChange={handleChange}
        />
      </FormComponent.Row>

      <FormComponent.Row label='Пароль' error={formErrors.password}>
        <Input
          type='password'
          name='password'
          value={data.password}
          placeholder='Придумайте пароль'
          autoFocus={focus === 'password'}
          onChange={handleChange}
        />
      </FormComponent.Row>

      <FormComponent.ActionRow>
        <Button type='submit' fullWidth design='secondary' loading={isFetching}>
          Зарегистрироваться
        </Button>
      </FormComponent.ActionRow>
    </FormComponent>
  );
};
