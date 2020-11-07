import React from 'react';
import { Message } from '../../NotificationsProvider';
import { Notification } from './components/Notification';
import styles from './Notifications.module.css';

interface Props {
  messages: Message[];
  onClose: (message: Message) => void;
}

export const Notifications: React.FunctionComponent<Props> = ({
  messages,
  onClose,
}) => (
  <div className={styles.root}>
    {messages.map((item) => (
      <Notification key={item.id} message={item} onClose={onClose} />
    ))}
  </div>
);
