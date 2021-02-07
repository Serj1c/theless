import React, { useCallback, useState } from 'react';
import { AuthLayout } from 'components/layouts';
import { Confirm, Form as Step1 } from './components';

type State = 'form' | 'confirm';

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
  const [state, setState] = useState<State>('form');

  /** Handle next state transition */
  const handleNext = useCallback(() => {
    setState('confirm');
  }, []);

  /** Handle form inputs changes */
  const handleChange = useCallback(({ name, value }) => {
    setFormData((v) => ({ ...v, [name]: value }));
  }, []);

  return (
    <AuthLayout>
      {state === 'form' ? (
        <Step1 data={formData} onChange={handleChange} onNext={handleNext} />
      ) : (
        <Confirm email={formData.email} />
      )}
    </AuthLayout>
  );
};
