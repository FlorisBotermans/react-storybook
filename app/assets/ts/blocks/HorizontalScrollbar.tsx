import Scrollbar from 'smooth-scrollbar';
import React, { useRef, FC, ReactNode } from 'react';
import { useIsomorphicLayoutEffect } from '../utils/serverSide/rendering';

class HorizontalScrollPlugin extends Scrollbar.ScrollbarPlugin {
  static pluginName = 'horizontalScroll';

  transformDelta(delta, fromEvent) {
    if (!/wheel/.test(fromEvent.type)) {
      return delta;
    }

    // @see: https://github.com/idiotWu/smooth-scrollbar/issues/181
    const { x, y } = delta;
    return {
      y: 0,
      x: Math.abs(x) > Math.abs(y) ? x : y
    };
  }
}

Scrollbar.use(HorizontalScrollPlugin);

type HtmlDivElementWithScrollbar = HTMLDivElement & {
  scrollbar: Scrollbar;
}

export type TProps = {
  className?: string;
  scrollbarRef?: React.MutableRefObject<Scrollbar>
  render: () => ReactNode
};

const HorizontalScrollbar: FC<TProps> = (props) => {
  const {
    className = '',
    scrollbarRef,
    render
  } = props;

  const internalScrollbarRef = useRef<Scrollbar>(null);
  const scrollerRef = useRef<HtmlDivElementWithScrollbar>(null);

  useIsomorphicLayoutEffect(() => {
    if (!internalScrollbarRef.current) {
      internalScrollbarRef.current = Scrollbar.init(scrollerRef.current);
      scrollerRef.current.scrollbar = internalScrollbarRef.current;
      if (scrollbarRef) {
        scrollbarRef.current = internalScrollbarRef.current;
      }
    }

    return () => {
      if (scrollbarRef) {
        scrollbarRef.current = undefined;
      }
      internalScrollbarRef.current.destroy();
      internalScrollbarRef.current = undefined;
    };
  });

  return (
    <div className={className} ref={scrollerRef}>
      {render && render()}
    </div>
  );
};

export default HorizontalScrollbar;
