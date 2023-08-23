import React, { FC, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';
import Swiper, { Pagination } from 'swiper';

import { TTimelineSectionProps, TSwiperState } from './typings';
import { TimelineSectionSlide } from './TimelineSectionSlide';
import Square from '../../../icons/arrow-square-size.svg';
import Section, { LogoBackground, LogoPosition } from '../Containers/Section';
import { useIsomorphicLayoutEffect } from '../../utils/serverSide/rendering';

const InlineTabButton: FC<{ className: string }> = ({ className, children }) => {
  return <button className={className}>{children}</button>;
};

const TimelineSection: FC<TTimelineSectionProps> = ({ id, items = [], prevSlideText = '', nextSlideText = '' }) => {
  const timelineRef = useRef(null);
  const timelineTabsRef = useRef(null);
  const timelineSliderRef = useRef<Swiper>(null);
  const timelineContentSliderRefs = useRef<TSwiperState>({ activeIndex: 0, sliders: [] });
  const tabs = items ? items.map((item) => item.title) : [];

  useIsomorphicLayoutEffect(() => {
    const timelineSlider = new Swiper(timelineRef.current, {
      centeredSlides: true,
      slidesPerView: 'auto',
      spaceBetween: 60,
      modules: [Pagination],
      pagination: {
        el: timelineTabsRef.current,
        clickable: true,
        bulletClass: 'timeline-tabs__button',
        bulletActiveClass: 'timeline-tabs__button--active',
        renderBullet: (index, className) => {
          return ReactDOMServer.renderToString(
            <InlineTabButton className={className}>
              {tabs[index]}
            </InlineTabButton>
          );
        }
      }
    });

    timelineSlider.on('slideChange', () => {
      timelineContentSliderRefs.current.activeIndex = timelineSlider.activeIndex;
    });

    timelineSliderRef.current = timelineSlider;
    return () => timelineSlider.destroy(true, true);
  }, [tabs]);

  const handlePrevSlide = () => {
    const { activeIndex, sliders } = timelineContentSliderRefs.current;
    const activeContentSlider = sliders[activeIndex];
    if (!activeContentSlider) return;

    if (activeContentSlider.isBeginning) {
      timelineSliderRef.current.slidePrev();
    } else {
      sliders[activeIndex].slidePrev();
    }
  };

  const handleNextSlide = () => {
    const { activeIndex, sliders } = timelineContentSliderRefs.current;
    const activeContentSlider = sliders[activeIndex];
    if (!activeContentSlider) return;

    if (activeContentSlider.isEnd) {
      timelineSliderRef.current.slideNext();
    } else {
      sliders[activeIndex].slideNext();
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <Section id={id} className="timeline-section" logo={{ background: LogoBackground.White, position: LogoPosition.Center }}>
      <div className="timeline-section__tabs-container">
        <div className="timeline-section__kantlijn-content" style={{ position: 'relative' }}>
          <div className="timeline-tabs" ref={timelineTabsRef} />
        </div>
      </div>
      <div className="timeline-section__swiper">
        <div className="timeline-section__swiper-fill-container">
          <div className="timeline-section__swiper-fill">
          </div>
        </div>
        <div className="timeline-section__swiper-center">
          <div className="swiper-container timeline-section__swiper-container" ref={timelineRef}>
            <div className="swiper-wrapper">
              {items.map((itemProps) => (
                <TimelineSectionSlide key={JSON.stringify(itemProps)} {...itemProps} sliderRefs={timelineContentSliderRefs} />
              ))}
            </div>
            <div className="timeline-section__buttons">
              <div className="timeline-section__buttons-center">
                <button className="timeline-section__prev-button" onClick={() => handlePrevSlide()}>
                  <Square className="timeline-section__prev-icon" />
                  <span className="sr-only">{prevSlideText}</span>
                </button>
                <button className="timeline-section__next-button" onClick={() => handleNextSlide()}>
                  <Square className="timeline-section__next-icon" />
                  <span className="sr-only">{nextSlideText}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
export default TimelineSection;
