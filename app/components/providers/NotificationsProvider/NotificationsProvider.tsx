import React, { useCallback, useMemo, useState } from 'react';
import { Context, context } from './context';
import { Notifications } from './components';

export interface Message {
  id?: string;
  title?: React.ReactNode;
  message: React.ReactNode;
  delay?: number | null;
}

interface CloseHandler {
  (message: Message): void;
}

export const NotificationsProvider: React.FunctionComponent = ({
  children,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const value = useMemo<Context>(() => ({ setMessages }), []);

  /**
   * Notification close handler
   */
  const closeHandler: CloseHandler = useCallback((message) => {
    setMessages((messages) => messages.filter((item) => item !== message));
  }, []);

  return (
    <context.Provider value={value}>
      {children}
      <Notifications messages={messages} onClose={closeHandler} />
    </context.Provider>
  );
};
