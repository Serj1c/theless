import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { usePopper } from 'react-popper';
import { Placement } from '@popperjs/core';
import styles from './Tooltip.module.css';

interface Props {
  content: string;
  open?: boolean;
  placement?: Placement;
}

export const Tooltip: React.FunctionComponent<Props> = ({
  children,
  content,
  open,
  placement,
}) => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
    {
      placement,
      modifiers: [
        {
          name: 'arrow',
          options: {
            element: arrowElement,
            padding: 4,
          },
        },
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
        {
          name: 'computeStyles',
          options: {
            adaptive: false,
          },
        },
      ],
    }
  );

  return (
    <>
      <span ref={setReferenceElement}>{children}</span>

      <CSSTransition in={open} timeout={200} mountOnEnter unmountOnExit>
        {(state) => (
          <div
            ref={setPopperElement}
            style={popperStyles.popper}
            className={`${styles.tooltip} ${styles[`tooltip_state_${state}`]}`}
            {...attributes.popper}
          >
            {content}
            <div
              ref={setArrowElement}
              className={styles.arrow}
              style={popperStyles.arrow}
            />
          </div>
        )}
      </CSSTransition>
    </>
  );
};
