import React, { FC } from 'react';
import classNames from 'classnames';
import LazySizes from '../blocks/LazySizes';
import imageUrlsToLazySizesProps from '../utils/imageUrlsToLazySizesProps';

type TProps = {
  title: string;
  subTitle?: string;
  linkUrl: string;
  imageUrls: string[];
  className?: string;
}

const LinkBlock: FC<TProps> = (props) => {
  const {
    title = '',
    subTitle = null,
    linkUrl = '',
    imageUrls = [],
    className
  } = props;
  const linkBlockClass = classNames('link-block', className);

  return (
    <a href={linkUrl} className={linkBlockClass}>
      <LazySizes.span className="link-block__image" {...imageUrlsToLazySizesProps(imageUrls, 'LinkBlock')} />
      <span className="link-block__title">{title}</span>
      {subTitle && <span className="link-block__subtitle">{subTitle}</span>}
    </a>
  );
};

export type TLinkBlockProps = TProps;
export default LinkBlock;