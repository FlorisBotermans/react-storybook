import React, { FC } from 'react';
import NewsGridBlock, { TNewsGridBlockProps } from '../../components/GridBlock/NewsGridBlock';
import EventGridBlock, { TEventGridBlockProps } from '../../components/GridBlock/EventGridBlock';
import EducationGridBlock, { TEducationGridBlockProps } from '../../components/GridBlock/EducationGridBlock';
import ContentGridBlock, { TContentGridBlockProps } from '../../components/GridBlock/ContentGridBlock';
import ContactGridBlock, { TContactGridBlockProps } from '../../components/GridBlock/ContactGridBlock';
import { TBlockListProps } from './typings';

const BlockList: FC<TBlockListProps> = ({ items }) => (
  <>
    {items.map((item) => {
      const { pageType, ...unkeyedProps } = item;

      const props = {
        ...unkeyedProps,
        key: JSON.stringify(unkeyedProps)
      };

      switch (pageType) {
        case 'News':
          return <NewsGridBlock {...(props as TNewsGridBlockProps)} />;
        case 'Event':
          return <EventGridBlock {...(props as TEventGridBlockProps)} />;
        case 'Education':
          return <EducationGridBlock {...(props as TEducationGridBlockProps)} />;
        case 'PageContent':
          return <ContentGridBlock {...(props as TContentGridBlockProps)} options={{ negative: true }} />;
        case 'Expositie':
        case 'Werkplaats':
        case 'Verhalen':
          return <ContentGridBlock {...(props as TContentGridBlockProps)} />;
        case 'Contact':
          return <ContactGridBlock {...(props as TContactGridBlockProps)} />;
        default:
          throw new Error(`Page type ${pageType} doesn't have a component. Please provide another one.`);
      }
    })}
  </>
);

export default BlockList;
