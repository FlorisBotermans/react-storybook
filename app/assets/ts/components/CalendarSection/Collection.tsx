import React, { FC, useRef } from 'react';
import { TCollectionProps } from './typings';
import useMeasure from 'react-use-measure';
import { ResizeObserver } from '@juggle/resize-observer';
import { useIsomorphicLayoutEffect } from '../../utils/serverSide/rendering';

const Collection: FC<TCollectionProps> = ({
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
      className="calendar__collection-info"
    >
      {title}
    </div>
  );
};

export default Collection;