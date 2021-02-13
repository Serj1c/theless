import { useContext } from 'react';
import { userContext, UserContext } from './userContext';

export const useUser = (): UserContext | never => {
  const context = useContext<UserContext>(userContext);

  if (!context) {
    throw new Error('useUser should be used inside UserProvider');
  }

  return context;
};
