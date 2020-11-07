import React from 'react';
import { Message } from './NotificationsProvider';

export interface Context {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export const context = React.createContext<Context>(null);
