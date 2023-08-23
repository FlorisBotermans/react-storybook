import React, { FC, useRef } from 'react';
import { TGroupProps } from './typings';
import useMeasure from 'react-use-measure';
import { ResizeObserver } from '@juggle/resize-observer';
import { useIsomorphicLayoutEffect } from '../../utils/serverSide/rendering';

const Group: FC<TGroupProps> = ({
  id,
  title,
  onHeightChange
}) => {
  const [ref, { height: measuredHeight }] = useMeasure({ polyfill: ResizeObserver });
  const height = useRef(0);
  useIsomorphicLayoutEffect(() => {
    if (height.current === measuredHeight) return;
    height.current = measuredHeight;
    onHeightChange(id, measuredHeight);
  }, [onHeightChange, measuredHeight, height, id]);

  return (
    <div
      ref={ref}
      className="calendar__group-info"
    >
      <div className="calendar__group-title">
        {title}
      </div>
    </div>
  );
};

export default Group;