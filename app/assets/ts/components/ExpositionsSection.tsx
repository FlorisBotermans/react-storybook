import React, { FC, useRef } from 'react';
import Swiper, { Navigation } from 'swiper';

import LazySizes from '../blocks/LazySizes';
import Section from './Containers/Section';
import Square from '../../icons/arrow-square-size.svg';
import imageUrlsToLazySizesProps from '../utils/imageUrlsToLazySizesProps';
import { useIsomorphicLayoutEffect } from '../utils/serverSide/rendering';

type TProps = {
  id?: string;
  nextSlideText: string;
  items: {
    title: string;
    artist: string;
    imageUrls: string[];
    linkUrl: string;
  }[];
};

const ExpositionsSection: FC<TProps> = ({ id, items = [], nextSlideText = '' }) => {
  const sliderRef = useRef();
  const nextButtonRef = useRef();
  const prevButtonRef = useRef();

  useIsomorphicLayoutEffect(() => {
    if (!sliderRef.current) return;

    const slider = new Swiper(sliderRef.current, {
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 30,
      loop: true,
      modules: [Navigation],
      navigation: {
        prevEl: prevButtonRef.current,
        nextEl: nextButtonRef.current
      }
    });

    return () => slider.destroy(true, true);
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <Section id={id} className="expositions-section">
      <div className="expositions-section__button-container">
        <button className="expositions-section__button-prev" ref={prevButtonRef}>
          <Square />
          <span className="sr-only">{nextSlideText}</span>
        </button>
      </div>
      <div className="swiper-container" ref={sliderRef}>
        <div className="swiper-wrapper">
          {items.map(item => (
            <a href={item.linkUrl} key={JSON.stringify(item)} className="swiper-slide expositions-section__slide">
              {item.title &&
                <span className="expositions-section__slide-title">
                  {item.title}
                </span>
              }
              {item.artist &&
                <span className="expositions-section__slide-artist">
                  {item.artist}
                </span>
              }
              {item.imageUrls && item.imageUrls.length > 0 &&
                <LazySizes.span className="expositions-section__slide-image" {...imageUrlsToLazySizesProps(item.imageUrls, 'Exposition')} />
              }
            </a>
          ))}
        </div>
      </div>
      <div className="expositions-section__button-container">
        <button className="expositions-section__button-next" ref={nextButtonRef}>
          <Square />
          <span className="sr-only">{nextSlideText}</span>
        </button>
      </div>
    </Section>
  );
};

export type TExpositionsSectionProps = TProps;
export default ExpositionsSection;