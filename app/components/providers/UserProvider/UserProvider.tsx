import React, { useMemo, useState } from 'react';
import { User, UserContext, userContext } from './userContext';

interface Props {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: Props): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);

  const value = useMemo<UserContext>(() => ({ user, setUser }), [user]);

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};
