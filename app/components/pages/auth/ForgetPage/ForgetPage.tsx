import React, { useCallback, useState } from 'react';
import { AuthLayout } from 'components/layouts';
import { Header } from 'components/ui';
import { Step1, Step2 } from './components';

type AppState = 'step1' | 'step2';

export const ForgetPage: React.FunctionComponent = () => {
  const [state, setState] = useState<AppState>('step1');

  const handleNext = useCallback(() => {
    setState('step2');
  }, []);

  return (
    <AuthLayout>
      <Header level={2} align='center'>
        Восстановление пароля
      </Header>

      {state === 'step1' ? <Step1 onNext={handleNext} /> : <Step2 />}
    </AuthLayout>
  );
};
