import { Message } from '../NotificationsProvider';

const DELAY = 4_000;
const LIMIT = 3;

let messageId = 0;

interface AddMessage {
  (messages: Message[], message: Message): Message[];
}

export const addMessage: AddMessage = (messages, message) => {
  const result = [
    {
      ...message,
      id: message.id || `notification_${messageId++}`,
      delay: message.delay === undefined ? DELAY : message.delay,
    },
    ...messages.filter((item) => item.id !== message.id),
  ];

  if (result.length > LIMIT) {
    result.length = LIMIT;
  }

  return result;
};
