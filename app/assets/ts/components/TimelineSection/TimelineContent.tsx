import React, { FC, useRef } from 'react';
import Swiper, { Pagination } from 'swiper';

import { TTimelineContentProps } from './typings';
import { TimelineContentSlide } from './TimelineContentSlide';
import { useIsomorphicLayoutEffect } from '../../utils/serverSide/rendering';

const TimelineContent: FC<TTimelineContentProps> = ({ slides, sliderRefs }) => {
  const contentSliderRef = useRef(null);
  const contentSliderPaginationRef = useRef(null);
  useIsomorphicLayoutEffect(() => {
    const timelineContentSlider = new Swiper(contentSliderRef.current, {
      nested: true,
      direction: 'horizontal',
      modules: [Pagination],
      pagination: {
        el: contentSliderPaginationRef.current,
        clickable: true
      }
    });

    timelineContentSlider.on('slideChange', () => {
      timelineContentSlider.pagination.update();
    });

    sliderRefs.current.sliders.push(timelineContentSlider);
    return () => timelineContentSlider.destroy(true, true);
  }, [sliderRefs]);

  return (
    <div className="swiper-container timeline-content__container" ref={contentSliderRef}>
      <div className="swiper-wrapper">
        {slides.map(contentSlideProps => (
          <TimelineContentSlide key={JSON.stringify(contentSlideProps)} {...contentSlideProps} />
        ))}
      </div>
      {slides && slides.length > 1 &&
        <div className="swiper-pagination timeline-content__pagination" ref={contentSliderPaginationRef} />
      }
    </div>
  );
};

export default TimelineContent;
