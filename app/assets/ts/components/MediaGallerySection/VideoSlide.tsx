import React, { FC, useEffect, useState } from 'react';
import LazySizes from '../../blocks/LazySizes';
import Video from '../../blocks/Video';
import imageUrlsToLazySizesProps from '../../utils/imageUrlsToLazySizesProps';
import { TVideoSlideProps } from './typings';
import PlayIcon from '../../../icons/play.svg';

const VideoSlide: FC<TVideoSlideProps> = ({ videoUrl, posterImageUrls, alt, active: activeProp, autoplay: autoplayProp, children, inOverlay = false }) => {
  const [autoplay, setAutoplay] = useState(autoplayProp);
  const [active, setActive] = useState(activeProp);

  useEffect(() => {
    setActive(activeProp);
    if (activeProp) return;

    setAutoplay(false);
  }, [activeProp, active, setAutoplay]);

  useEffect(() => {
    if (autoplayProp === autoplay || !autoplayProp) return;

    setAutoplay(autoplayProp);
  }, [autoplay, autoplayProp, setAutoplay]);

  return (
    <div className="media-gallery-section__slide-video">
      <div className="media-gallery-section__slide-video-scaler">
        <Video url={videoUrl} autoplay={active && autoplay} />
      </div>
      {!autoplay && (
        <>
          <button className="media-gallery-section__slide-video-btn" onClick={() => setAutoplay(true)} disabled={!active}>
            {posterImageUrls?.length > 0 &&
              <div className="media-gallery-section__slide-video-shadow">
                <LazySizes.img className="media-gallery-section__slide-video-poster" alt={alt} {...imageUrlsToLazySizesProps(posterImageUrls, inOverlay ? 'MediaSlideFull' : 'MediaSlide')} />
              </div>
            }
            <PlayIcon className="media-gallery-section__slide-video-play" />
          </button>
          {children}
        </>
      )}
    </div>
  );
};

export default VideoSlide;
