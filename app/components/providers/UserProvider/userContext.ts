import React from 'react';

export interface User {
  id: string;
  email: string;
}

export interface UserContext {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const userContext = React.createContext<UserContext | null>(null);
