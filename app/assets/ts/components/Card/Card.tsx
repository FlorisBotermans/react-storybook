import React, { FC } from 'react';
import classNames from 'classnames';
import { TCardProps } from './typings';
import LazySizes from '../../blocks/LazySizes';
import imageUrlsToLazySizesProps from '../../utils/imageUrlsToLazySizesProps';
import { getOptionalAnchorProps } from '../../utils/anchorHelper';
import ArrowIcon from '../../../icons/arrow.svg';

const Card: FC<TCardProps> = ({ text, url, imageUrls }) => {
  const hasImage = imageUrls?.length > 0;
  return (
    <div className="container container--margin-bottom">
      <div className="container container--center-wide">
        <div className={classNames('card', { 'card--has-image': hasImage })}>
          {hasImage && (
            <LazySizes.img className="card__image" {...imageUrlsToLazySizesProps(imageUrls, 'Card')} />
          )}
          <a className="card__link" href={url} {...getOptionalAnchorProps(url)}>
            <span className="card__link-text">{text}</span>
            <ArrowIcon className="card__link-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
