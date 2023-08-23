import React, { FC } from 'react';

import { TTimelineSectionSlideProps } from './typings';
import TimelineContent from './TimelineContent';
import LazySizes from '../../blocks/LazySizes';
import imageUrlsToLazySizesProps from '../../utils/imageUrlsToLazySizesProps';

export const TimelineSectionSlide: FC<TTimelineSectionSlideProps> = (props) => {
  return (
    <div className="swiper-slide timeline-section__slide">
      <LazySizes.div className="timeline-section__slide-image" {...imageUrlsToLazySizesProps(props.imageUrls, 'TimelineSlide')} />
      <div className="timeline-section__slide-content">
        {props.items && props.items.length > 0 &&
          <TimelineContent slides={props.items} sliderRefs={props.sliderRefs} />
        }
      </div>
    </div>
  );
};
