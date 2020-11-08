import React from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
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
  <TransitionGroup className={styles.root}>
    {messages.map((item) => (
      <Transition timeout={300} key={item.id}>
        {(state) => (
          <Notification message={item} state={state} onClose={onClose} />
        )}
      </Transition>
    ))}
  </TransitionGroup>
);
