import Swiper from 'swiper';
import React, { MutableRefObject } from 'react';

export type TSwiperState = {
  activeIndex: number;
  sliders: Swiper[];
}

export type TTimelineSlideProps = {
  title: string;
  content: string;
}

export type TTimelineSectionSlideProps = {
  title: string;
  imageUrls?: string[];
  imageAlt?: string;
  items: TTimelineSlideProps[];
  sliderRefs: React.MutableRefObject<TSwiperState>
};

export type TTimelineSectionProps = {
  id?: string;
  items: TTimelineSectionSlideProps[];
  prevSlideText: string;
  nextSlideText: string;
}

export type TTimelineContentProps = {
  slides: TTimelineSlideProps[];
  sliderRefs: MutableRefObject<TSwiperState>;
}

export type TTimelineContentSlideProps = {
  content: string;
}
