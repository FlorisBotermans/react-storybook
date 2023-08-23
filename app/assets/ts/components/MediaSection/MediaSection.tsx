
import React, { FC } from 'react';
import Section, { LogoPosition, LogoBackground } from '../Containers/Section';
import { TMediaSectionProps } from './typings';
import Image from './Image';
import Video from '../../blocks/Video';
import { purifyInnerHTML } from '../../utils/domPurify';
import Tooltip from '../../blocks/Tooltip';
import { getOptionalAnchorProps } from '../../utils/anchorHelper';

const MediaSection: FC<TMediaSectionProps> = ({ id, type, videoUrl, imageUrls, alt, description, credits, linkUrl }) => {
  if (!type || (!videoUrl && !imageUrls)) return null;

  const Media = () => (
    <>
      {type === 'image' && <Image imageUrls={imageUrls} alt={alt} />}
      {type === 'video' && <Video url={videoUrl} alt={alt} />}
    </>
  );

  return (
    <Section
      id={id}
      className="media-section container--center-wide container--margin"
      logo={{
        position: LogoPosition.Center,
        background: LogoBackground.White
      }}>
      <div className="media-section__container">
        {(linkUrl && type !== 'video')
          ? <a href={linkUrl} {...getOptionalAnchorProps(linkUrl)}><Media /></a>
          : <Media />
        }
        {credits &&
          <div className="media-section__info">
            <Tooltip text={credits} />
          </div>
        }
      </div>
      {description && (
        <div className="media-section__description" dangerouslySetInnerHTML={purifyInnerHTML(description)} />
      )}
    </Section>
  );
};

export default MediaSection;
