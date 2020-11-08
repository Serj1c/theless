import React, { useCallback, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Header, Paragraph } from 'components/ui';
import { Icon } from 'components/common';
import { Message } from 'components/providers';
import styles from './Notification.module.css';

type State = 'unmounted' | 'exited' | 'entering' | 'entered' | 'exiting';

interface Props {
  state?: State;
  message: Message;
  onClose: (message: Message) => void;
}

export const Notification: React.FunctionComponent<Props> = ({
  state,
  message,
  onClose,
}) => {
  const timerId = useRef<NodeJS.Timeout>();
  const { delay } = message;
  const rootClassName = classNames(styles.root, {
    [styles[`root_state_${state}`]]: state,
  });
  const notificationClassName = classNames(styles.notification, {
    [styles[`notification_state_${state}`]]: state,
  });

  /**
   * Mount / unmount
   */
  useEffect(() => {
    // Permanent notification, don't start timer
    if (delay === null) {
      return () => {};
    }

    timerId.current = setTimeout(() => {
      onClose(message);
    }, message.delay);

    return () => {
      clearTimeout(timerId.current);
    };
  }, [message, delay, onClose]);

  /**
   * Mouse enter handler
   */
  const handleMouseEnter = useCallback(() => {
    // Permanent notification, don't do anything
    if (delay === null) {
      return;
    }

    clearTimeout(timerId.current);
  }, [delay]);

  /**
   * Mouse leave handler
   */
  const handleMouseLeave = useCallback(() => {
    // Permanent notification, don't start timer
    if (delay === null) {
      return;
    }

    timerId.current = setTimeout(() => {
      onClose(message);
    }, message.delay);
  }, [onClose, message, delay]);

  /**
   * Close button click handler
   */
  const closeHandler = useCallback(() => {
    onClose(message);
  }, [onClose, message]);

  return (
    <div className={rootClassName}>
      <div
        className={notificationClassName}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.row_first}>
          <div className={styles.contentWrapper}>
            {/* Title */}
            {message.title &&
              (typeof message.title === 'string' ? (
                <Header level={3} color='inverted'>
                  {message.title}
                </Header>
              ) : (
                message.title
              ))}

            {/* Message */}
            {typeof message.message === 'string' ? (
              <Paragraph color='inverted'>{message.message}</Paragraph>
            ) : (
              message.message
            )}
          </div>
        </div>

        {/* Close button */}
        <div className={styles.row_last}>
          <button className={styles.close} onClick={closeHandler}>
            <Icon type='close' />
          </button>
        </div>
      </div>
    </div>
  );
};
