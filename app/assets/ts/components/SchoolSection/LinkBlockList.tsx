import React, { FC, useRef } from 'react';
import { useTrail, animated } from 'react-spring';
import { Scrollbar } from 'smooth-scrollbar/scrollbar';

import HorizontalScrollbar from '../../blocks/HorizontalScrollbar';
import ScrollButton from '../../blocks/ScrollButton';
import { ScrollButtonDirection, ScrollButtonPosition } from '../../blocks/ScrollButton/typings';
import breakpoints from '../../utils/breakpoints';
import LinkBlock, { TLinkBlockProps } from '../LinkBlock';

export const LinkBlockList: FC<{ list: TLinkBlockProps[]}> = ({ list = [] }) => {
  const trailOptions = { x: 0, from: { x: -100 }, immediate: !breakpoints.isDesktop() };
  const trailCount = list ? list.length : 0;
  const trail = useTrail(trailCount, trailOptions);
  const scrollbarRef = useRef<Scrollbar>(null);

  if (!list || list.length === 0) return null;
  return (
    <>
      <HorizontalScrollbar scrollbarRef={scrollbarRef} render={() => (
        <ul className="link-block-list">
          {trail.map(({ x, ...rest }, index) => {
            const item = list[index];
            return (
              <animated.li
                className="link-block-list__item"
                key={item.title}
                style={{ ...rest, transform: x.interpolate(x => `translateX(${x}%)`), zIndex: -index }}>
                <LinkBlock title={item.title} subTitle={item.subTitle} linkUrl={item.linkUrl} imageUrls={item.imageUrls} className="link-block-list__item-link" />
              </animated.li>
            );
          })}
        </ul>
      )} />
      <ScrollButton scrollbarState={scrollbarRef} options={{ direction: ScrollButtonDirection.Left, position: ScrollButtonPosition.OneThird }} />
      <ScrollButton scrollbarState={scrollbarRef} options={{ direction: ScrollButtonDirection.Right, position: ScrollButtonPosition.Right }} />
    </>
  );
};
