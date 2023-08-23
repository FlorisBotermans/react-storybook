import React, { FC, useState } from 'react';
import classNames from 'classnames';

import Icon from '../../../icons/arrow.svg';
import { ScrollButtonDirection, ScrollButtonPosition, TScrollButtonProps } from './typings';
import { useIsomorphicLayoutEffect } from '../../utils/serverSide/rendering';

const ScrollButton: FC<TScrollButtonProps> = ({
  scrollbarState,
  options = {
    direction: ScrollButtonDirection.Right
  }
}) => {
  options.direction = options.direction || ScrollButtonDirection.Right;

  const scrollButtonClass = classNames('scroll-button', options.className, {
    'scroll-button--pos-one-third': options.position === ScrollButtonPosition.OneThird,
    'scroll-button--direction-left': options.direction === ScrollButtonDirection.Left
  });

  const [disabled, setDisabled] = useState(true);

  const handleClick = () => {
    const currentScrollLeft = scrollbarState.current.scrollLeft;
    const x = currentScrollLeft + (600 * options.direction);
    const duration = 600;
    scrollbarState.current.scrollTo(x, 0, duration);
  };

  useIsomorphicLayoutEffect(() => {
    if (!scrollbarState.current) return;

    const checkVisibility = () => {
      const { limit, offset } = scrollbarState.current;
      const { direction } = options;
      if (disabled === (
        (direction === ScrollButtonDirection.Left && offset.x === 0) ||
        (direction === ScrollButtonDirection.Right && offset.x === limit.x)
      )) return;

      setDisabled(!disabled);
    };
    checkVisibility();
    scrollbarState.current.addListener(checkVisibility);

    const currentState = scrollbarState.current;
    return () => currentState.removeListener(checkVisibility);
  }, [disabled, options, scrollbarState]);

  return (
    <button className={scrollButtonClass} onClick={() => handleClick()} disabled={disabled}>
      <Icon className="scroll-button__icon" />
    </button>
  );
};

export default ScrollButton;
