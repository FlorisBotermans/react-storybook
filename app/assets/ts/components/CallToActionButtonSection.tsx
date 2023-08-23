import React, { FC } from 'react';

import LazySizes from '../blocks/LazySizes';
import Arrow from '../../icons/arrow-scalable.svg';
import imageUrlsToLazySizesProps from '../utils/imageUrlsToLazySizesProps';
import ContentSectionContainer from './Containers/ContentSectionContainer';
import { purifyInnerHTML } from '../utils/domPurify';

type TProps = {
  id?: string;
  title: string;
  subtitle?: string;
  label?: string;
  imageUrls?: string[];
  imageAlt?: string;
  linkUrl?: string;
};

const CallToActionButtonSection: FC<TProps> = (props) => {
  const {
    id,
    title = '',
    subtitle,
    label,
    imageUrls,
    imageAlt = '',
    linkUrl = ''
  } = props;

  return (
    <ContentSectionContainer id={id} className="cta-button-section">
      <a href={linkUrl} className="cta-button">
        {imageUrls && imageUrls.length &&
          <span className="cta-button__image">
            <LazySizes.img {...imageUrlsToLazySizesProps(imageUrls, 'CTAButton')} alt={imageAlt} className="cta-button__image-src" />
          </span>
        }
        <span className="cta-button__content">
          {label &&
            <span className="cta-button__content-label">
              {label}
            </span>
          }
          <span className="cta-button__content-title" dangerouslySetInnerHTML={purifyInnerHTML(title)} />
          {subtitle &&
            <span className="cta-button__content-subtitle" dangerouslySetInnerHTML={purifyInnerHTML(subtitle)} />
          }
        </span>
        <span className="cta-button__bg">
          <Arrow className="cta-button__icon" />
        </span>
      </a>
    </ContentSectionContainer>
  );
};

export type TCallToActionButtonSectionProps = TProps;
export default CallToActionButtonSection;