import React, { useState } from 'react';
import { usePopper } from 'react-popper';
import { Placement } from '@popperjs/core';
import tooltipStyles from './Tooltip.module.css';

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
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [
      { name: 'arrow', options: { element: arrowElement, padding: 4 } },
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  return (
    <>
      <span ref={setReferenceElement}>{children}</span>

      {open && (
        <div
          ref={setPopperElement}
          className={tooltipStyles.tooltip}
          style={styles.popper}
          {...attributes.popper}
        >
          {content}
          <div
            ref={setArrowElement}
            className={tooltipStyles.arrow}
            style={styles.arrow}
          />
        </div>
      )}
    </>
  );
};
