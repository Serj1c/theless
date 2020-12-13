import React, { useCallback, useEffect } from 'react';
import { Link, Text } from 'components/ui';
import CloseIcon from './resources/close.svg';
import { menuItems } from './data/menuItems';
import styles from './Menu.module.css';

interface OnClose {
  (): void;
}

export interface Props {
  onClose: OnClose;
}

export const Menu: React.FunctionComponent<Props> = ({ onClose }) => {
  const handleEscPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key == 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleEscPress);

    return () => {
      document.removeEventListener('keydown', handleEscPress);
    };
  }, [onClose]);

  return (
    <div className={styles.root}>
      <div className={styles.closeWrapper}>
        <button className={styles.close} onClick={onClose}>
          <CloseIcon />
        </button>
      </div>

      <div className={styles.listWrapper}>
        <ul className={styles.list}>
          {menuItems.map((item, i) => (
            <li key={i}>
              {item.type === 'divider' ? (
                <hr className={styles.divider} />
              ) : (
                <Link href={item.url} color='dark' underline={false}>
                  <Text size='xl' color='inherit' onClick={onClose}>
                    {item.title}
                  </Text>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
