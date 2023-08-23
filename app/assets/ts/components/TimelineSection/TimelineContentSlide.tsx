import React, { FC } from 'react';
import { purifyInnerHTML } from '../../utils/domPurify';
import { TTimelineContentSlideProps } from './typings';

export const TimelineContentSlide: FC<TTimelineContentSlideProps> = (props) => (
  <div className="swiper-slide">
    <div className="timeline-content__slide">
      <div className="timeline-content__slide-content" dangerouslySetInnerHTML={purifyInnerHTML(props.content)} />
    </div>
  </div>
);
