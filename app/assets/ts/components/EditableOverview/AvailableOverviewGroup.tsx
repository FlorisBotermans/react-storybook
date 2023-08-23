import classNames from 'classnames';
import React, { FC, useCallback, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import useMeasure from 'react-use-measure';
import ArrowIcon from '../../../icons/arrow-scalable.svg';
import AvailableOverviewItem from './AvailableOverviewItem';
import { TAvailableOverviewGroupProps } from './types';

const AvailableOverviewGroup: FC<TAvailableOverviewGroupProps> = ({
  title, items, addText, addItem
}) => {
  const [expanded, set] = useState(false);
  const toggle = useCallback(() => set(!expanded), [expanded]);
  const [ref, { height: viewHeight }] = useMeasure({ polyfill: ResizeObserver });
  const springProps = useSpring({ height: expanded ? viewHeight : 0 });

  return (
    <li className={classNames(
      'available-overview-group',
      { 'available-overview-group--expanded': expanded }
    )}>
      <button data-testid={title} className="available-overview-group__btn" onClick={toggle}>
        <span className="available-overview-group__btn-content">
          <ArrowIcon className="available-overview-group__arrow" title="" />
          <span className="available-overview-group__title">{title}</span>
        </span>
      </button>
      <animated.div className="available-overview-group__content" style={{ ...springProps, willChange: 'height', overflow: 'hidden' }}>
        <ul ref={ref} className="available-overview-group__list">
          {items?.map(({ id, ...item }) => (
            <AvailableOverviewItem key={JSON.stringify(id)} id={id} {...item} addText={addText} addItem={addItem} />
          ))}
        </ul>
      </animated.div>
    </li>
  );
};
export default AvailableOverviewGroup;