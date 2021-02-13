import React, { useCallback, useState } from 'react';
import { AuthLayout } from 'components/layouts';
import { Confirm, Form as Step1 } from './components';

type State = 'form' | 'confirm';

export const SignUpPage: React.FunctionComponent = () => {
  const [state, setState] = useState<State>('form');

  /** Handle next state transition */
  const handleNext = useCallback(() => {
    setState('confirm');
  }, []);

  return (
    <AuthLayout>
      {state === 'form' ? <Step1 onNext={handleNext} /> : <Confirm />}
    </AuthLayout>
  );
};
