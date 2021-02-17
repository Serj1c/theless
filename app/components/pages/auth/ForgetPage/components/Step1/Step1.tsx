import React, { useCallback, useEffect, useState } from 'react';
import { useUser } from 'components/providers';
import { Button, Form, Header, Input, Paragraph } from 'components/ui';
import { ERROR_MESSAGE_OTHER } from 'constants/errors';
import { axios, isAxiosError } from 'utils';

interface Props {
  onNext: () => void;
}

interface FormErrors {
  email?: string;
  common?: string;
}

interface ErrorPayload {
  error?: string;
  errors?: {
    email?: string;
  };
}

export const Step1: React.FunctionComponent<Props> = ({ onNext }) => {
  const { email, setEmail } = useUser();
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [autoFocus, setAutoFocus] = useState<boolean>(true);

  // Flush autoFocus value
  useEffect(() => {
    const timerId = setTimeout(() => {
      setAutoFocus(false);
    }, 0);

    return () => {
      clearTimeout(timerId);
    };
  }, [autoFocus]);

  /** Submit handler */
  const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
    async (event) => {
      event.preventDefault();

      // Email is empty, show error
      if (!email) {
        setFormErrors((v) => ({
          ...v,
          email: 'Введите email',
        }));
        setAutoFocus(true);

        return;
      }

      setIsFetching(true);
      setFormErrors((v) => ({
        ...v,
        common: undefined,
      }));

      try {
        await axios.post('/auth/reset-password');

        onNext();
      } catch (err: unknown) {
        if (
          isAxiosError<ErrorPayload>(err) &&
          (err.response.data.errors || err.response.data.error)
        ) {
          setFormErrors({
            email: err.response.data.errors?.email,
            common: err.response.data.error,
          });
        } else {
          setFormErrors({ common: ERROR_MESSAGE_OTHER });
        }
      }

      setIsFetching(false);
    },
    [onNext, email]
  );

  /** Input change handler */
  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setEmail(event.target.value);

      // Flush input error
      if (formErrors.email && event.target.value) {
        setFormErrors((v) => ({ ...v, email: undefined }));
      }
    },
    [formErrors.email, setEmail]
  );

  return (
    <>
      <Paragraph marginBottom='m'>
        Введите ваш email и&nbsp;мы&nbsp;пришлем вам ссылку
        на&nbsp;восстановление пароля.
      </Paragraph>

      <Form error={formErrors.common} narrow onSubmit={handleSubmit}>
        <Form.Row label='Email' error={formErrors.email}>
          <Input
            value={email}
            name='email'
            autoFocus={autoFocus}
            placeholder='Введите ваш email'
            onChange={handleChange}
          />
        </Form.Row>

        <Form.ActionRow>
          <Button type='submit' design='primary' loading={isFetching} fullWidth>
            Продолжить
          </Button>
        </Form.ActionRow>
      </Form>
    </>
  );
};
