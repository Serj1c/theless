import { useContext, useMemo } from 'react';
import { context } from './context';
import { Message } from './NotificationsProvider';
import { addMessage } from './utils/addMessage';
import { removeMessage } from './utils/removeMessage';

interface UseNotifications {
  (): UseNotificationReturn;
}

interface UseNotificationReturn {
  push(message: Message): void;
  remove(id: string): void;
}

export const useNotification: UseNotifications = () => {
  const { setMessages } = useContext(context);

  return useMemo(
    () => ({
      push: (message) => {
        setMessages((messages) => addMessage(messages, message));
      },
      remove: (id) => {
        setMessages((messages) => removeMessage(messages, id));
      },
    }),
    []
  );
};
