import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import { Menu as MenuComponent } from './components';
import MenuIcon from './resources/menu.svg';
import styles from './Menu.module.css';

export interface Props {
  inverted: boolean;
}

export const Menu: React.FunctionComponent<Props> = ({ inverted }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const className = classNames(styles.root, {
    [styles.root_inverted]: inverted,
  });

  const handleClick = useCallback(() => {
    setIsMenuOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <>
      <button className={className} onClick={handleClick}>
        <MenuIcon />
      </button>

      {isMenuOpen && <MenuComponent onClose={handleClose} />}
    </>
  );
};
