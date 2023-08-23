import React, { FC } from 'react';
import { TVideoProps } from './typings';

// Supports:
// https://www.youtube.com/embed/<videoId>
// https://www.youtube.com/watch?v=<videoId>
// https://youtu.be/<videoId>
const getYouTubeVideoParamsFromUrl = (url: string) => {
  const path = url.split('/').slice(-1)[0];
  const queryString = path.split('?').slice(-1)[0];
  const params = queryString.split('&').reduce(
    (params, param) => {
      const [keyOrValue, value] = param.split('=');
      if (value) {
        params[keyOrValue] = value;
      } else {
        params.v = keyOrValue;
      }
      return params;
    },
    { v: '', t: 0, start: 20 }
  );
  if (!params.v) {
    params.v = path.split('?')[0];
  }
  return params;
};

// Supports:
// https://vimeo.com/<videoId>
// https://player.vimeo.com/video/<videoId>
const getVimeoVideoIdFromUrl = (url: string) => {
  return url.split('/').pop();
};

// Supports:
// https://vimeo.com/event/<eventId>
// https://vimeo.com/event/<eventId>/embed
const getVimeoEventIdFromUrl = (url: string) => {
  return url.replace('/embed', '').split('/').pop();
};

const getVimeoStartFromUrl = (url: string) => {
  const hash = url.split('#').slice(-1)[0];
  for (const param of hash.split('&')) {
    const [keyOrValue, value] = param.split('=');
    if (keyOrValue === 't') {
      return value;
    }
  }
  return 0;
};

const getUrl = (url: string, autoplay = false) => {
  // VIMEO
  if (url.includes('vimeo.com')) {
    const start = getVimeoStartFromUrl(url);
    const params = `?dnt=1&color=ffffff&portrait=0${autoplay ? '&autoplay=1' : ''}#t=${start}`;
    if (url.includes('vimeo.com/event/')) {
      const eventId = getVimeoEventIdFromUrl(url);
      return `https://vimeo.com/event/${eventId}/embed${params}`;
    } else {
      const vimeoId = getVimeoVideoIdFromUrl(url);
      return `https://player.vimeo.com/video/${vimeoId}${params}`;
    }
  }

  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    // YOUTUBE
    const params = getYouTubeVideoParamsFromUrl(url);
    const videoId = params.v;
    const start = params.t || params.start;
    return `https://www.youtube-nocookie.com/embed/${videoId}?start=${start}${autoplay ? '&autoplay=1' : ''}`;
  }

  return null;
};

const Video: FC<TVideoProps> = ({ url, alt, autoplay = false }) => {
  const src = getUrl(url, autoplay);
  if (!src) {
    console.error('Video embed url not supported: ', url);
    return null;
  }

  return (
    <div className="video">
      <iframe
        className="video__frame"
        title={alt}
        src={src}
        width="560"
        height="315"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
      />
    </div>
  );
};

export default Video;
