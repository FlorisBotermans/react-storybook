import React, { FC } from 'react';
import classNames from 'classnames';
import ArrowIcon from '../../icons/arrow-scalable.svg';
import LazySizes from '../blocks/LazySizes';
import imageUrlsToLazySizesProps from '../utils/imageUrlsToLazySizesProps';
import { purifyInnerHTML } from '../utils/domPurify';
import Tooltip from '../blocks/Tooltip';
import { getOptionalAnchorProps } from '../utils/anchorHelper';

export type TProps = {
  title: string;
  subTitle: string;
  linkUrl: string;
  imageUrls: string[];
  imageCredits?: string;
  featuredText?: string;
  date?: string;
  options?: ExpositionOptions;
};
type ExpositionOptions = {
  showIcon?: boolean;
  className?: string;
};

const Exposition: FC<TProps> = (props) => {
  const {
    title,
    subTitle,
    linkUrl,
    imageUrls,
    imageCredits,
    featuredText = null,
    date = null,
    options = {}
  } = props;
  const { className = null, showIcon = false } = options;
  const expositionClass = classNames('exposition', className,
    { 'exposition--has-credits': imageCredits }
  );
  return (
    <div className={expositionClass}>
      <a className="exposition__link" href={linkUrl} {...getOptionalAnchorProps(linkUrl)}>
        <LazySizes.span className="exposition__image" {...imageUrlsToLazySizesProps(imageUrls, 'Exposition')}></LazySizes.span>
        <span className="exposition__content">
          {featuredText && <span className="exposition__featured">{featuredText}</span>}
          <span className="exposition__title">
            <span dangerouslySetInnerHTML={purifyInnerHTML(title)} />
            {showIcon && <ArrowIcon className="exposition__icon" />}
          </span>
          {subTitle && <span className="exposition__subtitle" dangerouslySetInnerHTML={purifyInnerHTML(subTitle)} />}
          {date && <span className="exposition__date">{date}</span>}
        </span>
      </a>
      {imageCredits &&
        <div className="exposition__credits">
          <Tooltip text={imageCredits} />
        </div>
      }
    </div>
  );
};

export type TExpositionProps = TProps;
export default Exposition;
