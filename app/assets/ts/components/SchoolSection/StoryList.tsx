import React, { FC, useRef } from 'react';

import Grid from '../Grid';
import HorizontalScrollbar from '../../blocks/HorizontalScrollbar';
import { PageType } from '../../typings/blocks';
import ScrollButton from '../../blocks/ScrollButton';
import { Scrollbar } from 'smooth-scrollbar/scrollbar';
import { TContentGridBlockProps } from '../GridBlock/ContentGridBlock';
import { ScrollButtonDirection, ScrollButtonPosition } from '../../blocks/ScrollButton/typings';

type TProps = {
  verhalen: TContentGridBlockProps[]
};

const setPageType = (items = [], pageType: PageType) => {
  return items.map(item => {
    item['pageType'] = pageType; //eslint-disable-line
    return item;
  });
};

const StoryList: FC<TProps> = (props) => {
  const scrollbarRef = useRef<Scrollbar>(null);
  const stories = setPageType(props.verhalen || [], 'Verhalen');
  return (
    <>
      <HorizontalScrollbar className="actual-list" scrollbarRef={scrollbarRef} render={() => (
        <div className="actual-list__content">
          <Grid items={stories} />
        </div>
      )} />
      <ScrollButton scrollbarState={scrollbarRef} options={{ direction: ScrollButtonDirection.Left, position: ScrollButtonPosition.OneThird }} />
      <ScrollButton scrollbarState={scrollbarRef} options={{ direction: ScrollButtonDirection.Right, position: ScrollButtonPosition.Right }} />
    </>
  );
};

export default StoryList;
