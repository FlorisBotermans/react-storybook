import React, { FC, useRef } from 'react';
import { Scrollbar } from 'smooth-scrollbar/scrollbar';

import HorizontalScrollbar from '../../blocks/HorizontalScrollbar';
import { TNewsGridBlockProps } from '../GridBlock/NewsGridBlock';
import { TEventGridBlockProps } from '../GridBlock/EventGridBlock';
import Grid from '../Grid';
import ScrollButton from '../../blocks/ScrollButton';
import { ScrollButtonDirection, ScrollButtonPosition } from '../../blocks/ScrollButton/typings';

type TProps = {
  nieuws: TNewsGridBlockProps[],
  evenementen: TEventGridBlockProps[]
};

const merge = (first = [], second = []) => {
  const list = [];
  const iterators = first.length >= second.length ? [first, second] : [second, first];
  const firstIterator = iterators[0];
  const secondIterator = iterators[1];
  firstIterator.forEach((item, index) => {
    list.push(item);
    if (secondIterator[index]) {
      list.push(secondIterator[index]);
    }
  });
  return list;
};

const setPageType = (items = [], pageType: string) => {
  return items.map(item => {
    item['pageType'] = pageType; //eslint-disable-line
    return item;
  });
};

const ActualList: FC<TProps> = (props) => {
  const scrollbarRef = useRef<Scrollbar>(null);

  const nieuws = setPageType(props.nieuws || [], 'News');
  const evenementen = setPageType(props.evenementen || [], 'Event');
  const list = merge(nieuws, evenementen);
  return (
    <>
      <HorizontalScrollbar scrollbarRef={scrollbarRef} className="actual-list" render={() => (
        <div className="actual-list__content">
          <Grid items={list} />
        </div>
      )} />
      <ScrollButton scrollbarState={scrollbarRef} options={{ direction: ScrollButtonDirection.Left, position: ScrollButtonPosition.OneThird }} />
      <ScrollButton scrollbarState={scrollbarRef} options={{ direction: ScrollButtonDirection.Right, position: ScrollButtonPosition.Right }} />
    </>
  );
};

export default ActualList;
