import React, { FC, useRef } from 'react';
import { TEventsProps } from './typings';
import useMeasure from 'react-use-measure';
import { ResizeObserver } from '@juggle/resize-observer';
import { useIsomorphicLayoutEffect } from '../../utils/serverSide/rendering';
import Event from './Event';

const Events: FC<TEventsProps> = ({
  groupId,
  title,
  lanes,
  interval,
  timeline,
  onHeightChange
}) => {
  const [ref, { height: measuredHeight }] = useMeasure({ polyfill: ResizeObserver });
  const height = useRef(0);
  useIsomorphicLayoutEffect(() => {
    if (height.current === measuredHeight) return;
    height.current = measuredHeight;
    onHeightChange(groupId, measuredHeight);
  }, [onHeightChange, measuredHeight, height, groupId]);

  return (
    <div className="calendar__events-group" ref={ref}>
      <div className="calendar__events-group-info">
        <div className="calendar__events-group-title">{title}</div>
      </div>
      <div className="calendar__events-lanes">
        {lanes.map((events, i) => (
          <div
            key={JSON.stringify({ i, events })}
            className="calendar__events-lane"
          >
            {events.map(event => (
              <Event
                key={JSON.stringify(event)}
                interval={interval}
                timeline={timeline}
                {...event}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;