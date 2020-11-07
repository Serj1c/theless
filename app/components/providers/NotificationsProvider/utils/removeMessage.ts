import { Message } from '../NotificationsProvider';

interface RemoveMessage {
  (messages: Message[], id: string): Message[];
}

export const removeMessage: RemoveMessage = (messages, id) =>
  messages.filter((message) => message.id !== id);
