/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { FC, useEffect, useRef, useState } from 'react';
import Swiper, { Navigation, Pagination, Controller } from 'swiper';
import LazySizes from '../../blocks/LazySizes';
import imageUrlsToLazySizesProps from '../../utils/imageUrlsToLazySizesProps';
import { useIsomorphicLayoutEffect } from '../../utils/serverSide/rendering';
import Square from '../../../icons/arrow-square-size.svg';
import Section from '../Containers/Section';
import { TMediaGallerySectionProps } from './typings';
import VideoSlide from './VideoSlide';
import Tooltip from '../../blocks/Tooltip';
import CrossIcon from '../../../icons/cross.svg';

const isInsideClickableElement = (elem: HTMLElement): boolean => {
  while (elem) {
    if (elem.tagName === 'BUTTON' || elem.tagName === 'A') return true;
    elem = elem.parentElement;
  }
  return false;
};

const isInsideTooltipButton = (elem: HTMLElement): boolean => {
  while (elem) {
    if (elem.tagName === 'BUTTON' && elem.classList?.contains('tooltip__btn')) return true;
    elem = elem.parentElement;
  }
  return false;
};

const MediaGallerySection: FC<TMediaGallerySectionProps> = ({
  id, items = [], prevSlideText = '', nextSlideText = ''
}) => {
  const sliderRef = useRef();
  const [clickedIndex, setClickedIndex] = useState<number>(-1);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const nextButtonRef = useRef();
  const prevButtonRef = useRef();
  const paginationRef = useRef();
  const [slider, setSlider] = useState<Swiper>();
  const overlaySliderRef = useRef();
  const [overlaySlider, setOverlaySlider] = useState<Swiper>();
  const [overlayIsVisible, setOverlayIsVisible] = useState(false);
  const overlayNextButtonRef = useRef();
  const overlayPrevButtonRef = useRef();
  const overlayPaginationRef = useRef();

  useIsomorphicLayoutEffect(() => {
    if (slider || !sliderRef.current || items.length === 1) return;

    const newSlider = new Swiper(sliderRef.current, {
      slidesPerView: 'auto',
      spaceBetween: 30,
      loop: true,
      loopedSlides: items?.length,
      updateOnWindowResize: true,
      updateOnImagesReady: true,
      modules: [Navigation, Pagination, Controller],
      navigation: {
        nextEl: nextButtonRef.current,
        prevEl: prevButtonRef.current
      },
      pagination: {
        el: paginationRef.current,
        clickable: true,
        bulletClass: 'media-gallery-section__paging-bullet',
        bulletActiveClass: 'media-gallery-section__paging-bullet--active'
      }
    });

    newSlider.on('slideChangeTransitionEnd', () => {
      const realActiveIndex = newSlider.slides.filter(slide => slide.dataset.swiperSlideIndex === newSlider.realIndex?.toString() && !slide.classList.contains('swiper-slide-duplicate'))?.index() || -1;
      if (newSlider.activeIndex !== realActiveIndex) {
        newSlider.slideTo(realActiveIndex, 0, false);
      }
      setActiveIndex(newSlider.realIndex);

      // Fix animation to the wrong position by forcing swiper to recalculate the sizes
      newSlider.updateSize();
      if (overlaySlider) overlaySlider.updateSize();
    });

    setSlider(newSlider);

    return () => {
      if (overlaySlider) overlaySlider.controller.control = undefined;
      newSlider.destroy(true, true);
      setSlider(null);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  useIsomorphicLayoutEffect(() => {
    if (!slider) return;
    const handleSlideClick = (_swiper: Swiper, e?: PointerEvent) => {
      const realIndex = parseInt(slider.clickedSlide.dataset.swiperSlideIndex, 10);
      const item = items[realIndex];
      const isVideo = item?.type === 'video';

      if (realIndex !== activeIndex && !isInsideTooltipButton(e?.target as HTMLElement)) {
        const realActiveIndex = slider.slides.filter(slide => slide.dataset.swiperSlideIndex === realIndex?.toString() && !slide.classList.contains('swiper-slide-duplicate'))?.index() || -1;
        slider.slideTo(realActiveIndex, isVideo ? 400 : 0);
        setActiveIndex(realIndex);
      }

      if (isInsideClickableElement(e?.target as HTMLElement)) return;

      setClickedIndex(realIndex);
      if (isVideo) return;

      setOverlayIsVisible(true);
    };
    slider.on('click', handleSlideClick);
    return () => slider.off('click', handleSlideClick);
  }, [slider, setActiveIndex, activeIndex, items]);

  useIsomorphicLayoutEffect(() => {
    if (clickedIndex === -1) return;

    if (clickedIndex !== activeIndex) {
      setClickedIndex(-1); // To reset the video autoplay prop to false once it has started playing
    }
  }, [activeIndex, clickedIndex, setClickedIndex]);

  // Fix animation to the wrong position by forcing swiper to recalculate the sizes
  useIsomorphicLayoutEffect(() => {
    if (!slider) return;
    setTimeout(() => slider.update(), 500);
  }, [slider]);

  useIsomorphicLayoutEffect(() => {
    if (overlaySlider || !overlayIsVisible || !overlaySliderRef.current || !slider) return;

    const newOverlaySlider = new Swiper(overlaySliderRef.current, {
      slidesPerView: 1,
      spaceBetween: 0,
      centeredSlides: true,
      loop: true,
      loopedSlides: items?.length,
      updateOnWindowResize: true,
      updateOnImagesReady: true,
      controller: {
        control: slider
      },
      initialSlide: slider.realIndex,
      modules: [Navigation, Pagination, Controller],
      navigation: {
        nextEl: overlayNextButtonRef.current,
        prevEl: overlayPrevButtonRef.current
      },
      pagination: {
        el: overlayPaginationRef.current,
        clickable: true,
        bulletClass: 'media-gallery-section__paging-bullet',
        bulletActiveClass: 'media-gallery-section__paging-bullet--active'
      }
    });
    slider.controller.control = newOverlaySlider;
    slider.updateSize();

    newOverlaySlider.on('slideChangeTransitionEnd', () => {
      setActiveIndex(slider.realIndex);
      // Fix animation to the wrong position by forcing swiper to recalculate the sizes
      newOverlaySlider.updateSize();
      if (slider) {
        slider.updateSize();
      }
    });

    setOverlaySlider(newOverlaySlider);

    return () => {
      slider.controller.control = undefined;
      newOverlaySlider.destroy(true, true);
      setOverlaySlider(null);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, overlayIsVisible, slider]);

  // Fix animation to the wrong position by forcing swiper to recalculate the sizes
  useIsomorphicLayoutEffect(() => {
    if (!overlaySlider) return;
    setTimeout(() => overlaySlider.updateSize(), 500);
  }, [overlaySlider]);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', overlayIsVisible);
  }, [overlayIsVisible]);

  if (!items || items.length === 0) return null;

  return (
    <Section id={id} className="media-gallery-section">
      {items.length > 1 &&
        <div className="media-gallery-section__button-container">
          <button className="media-gallery-section__button-prev" ref={prevButtonRef}>
            <Square />
            <span className="sr-only">{prevSlideText}</span>
          </button>
        </div>
      }
      <div className="media-gallery-section__slider">
        <div className="swiper-container" ref={sliderRef}>
          <div className="swiper-wrapper">
            {items.map((item, i) => {
              const { title, description, alt, type, imageUrls, imageSize, videoUrl, showTitle } = item;
              const Info = () => (
                <>
                  {(title || description) &&
                    <div className="media-gallery-section__slide-info">
                      {showTitle && title}
                      {description &&
                        <Tooltip text={description} />
                      }
                    </div>
                  }
                </>
              );
              return (
                <div
                  key={JSON.stringify(item)}
                  className="swiper-slide media-gallery-section__slide"
                >
                  {type === 'image' && imageUrls?.length > 0 &&
                    <>
                      <Info />
                      <div className="media-gallery-section__slide-image-center">
                        <div className="media-gallery-section__slide-image-shadow">
                          <LazySizes.img className="media-gallery-section__slide-image" alt={alt} {...imageUrlsToLazySizesProps(imageUrls, 'MediaSlide')} width={imageSize?.width} height={imageSize?.height} />
                        </div>
                      </div>
                    </>
                  }
                  {type === 'video' && videoUrl &&
                    <VideoSlide videoUrl={videoUrl} alt={alt} posterImageUrls={imageUrls} active={activeIndex === i} autoplay={clickedIndex === i}>
                      <Info />
                    </VideoSlide>
                  }
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {items.length > 1 &&
        <>
          <div className="media-gallery-section__button-container">
            <button className="media-gallery-section__button-next" ref={nextButtonRef}>
              <Square />
              <span className="sr-only">{nextSlideText}</span>
            </button>
          </div>
          <div className="media-gallery-section__paging" ref={paginationRef}></div>
        </>
      }
      {overlayIsVisible && (
        <div className="media-gallery-section__overlay">
          <div className="media-gallery-section__overlay-menu">
            <button className="media-gallery-section__overlay-close-btn" onClick={() => setOverlayIsVisible(false)}>
              <CrossIcon />
            </button>
          </div>
          <div className="media-gallery-section__overlay-center">
            <div className="media-gallery-section__overlay-backgrounds"></div>
            {items.length > 1 &&
              <div className="media-gallery-section__button-container">
                <button className="media-gallery-section__button-prev" ref={overlayPrevButtonRef}>
                  <Square />
                  <span className="sr-only">{prevSlideText}</span>
                </button>
              </div>
            }
            <div className="media-gallery-section__overlay-slider">
              <div className="swiper-container" ref={overlaySliderRef}>
                <div className="swiper-wrapper">
                  {items.map((item, i) => {
                    const { title, description, alt, type, imageUrlsFull, imageSizeFull, videoUrl, showTitle } = item;
                    const Info = () => (
                      <>
                        {(title || description) &&
                          <div className="media-gallery-section__slide-info">
                            {showTitle && title}
                            {description &&
                              <Tooltip text={description} />
                            }
                          </div>
                        }
                      </>
                    );
                    return (
                      <div key={JSON.stringify(item)} className="swiper-slide media-gallery-section__slide">
                        {type === 'image' && imageUrlsFull?.length > 0 &&
                          <>
                            <Info />
                            <div className="media-gallery-section__slide-image-center">
                              <div className="media-gallery-section__slide-image-shadow">
                                <LazySizes.img className="media-gallery-section__slide-image" alt={alt} {...imageUrlsToLazySizesProps(imageUrlsFull, 'MediaSlideFull')} width={imageSizeFull?.width} height={imageSizeFull?.height} />
                              </div>
                            </div>
                          </>
                        }
                        {type === 'video' && videoUrl &&
                          <VideoSlide videoUrl={videoUrl} alt={alt} posterImageUrls={imageUrlsFull} active={activeIndex === i} inOverlay={true}>
                            <Info />
                          </VideoSlide>
                        }
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {items.length > 1 &&
              <>
                <div className="media-gallery-section__button-container">
                  <button className="media-gallery-section__button-next" ref={overlayNextButtonRef}>
                    <Square />
                    <span className="sr-only">{nextSlideText}</span>
                  </button>
                </div>
                <div className="media-gallery-section__paging" ref={overlayPaginationRef}></div>
              </>
            }
          </div>
        </div>
      )}
    </Section>
  );
};

export default MediaGallerySection;
