import React, { FC } from 'react';
import classNames from 'classnames';
import Link from '../Link';
import { TCTAProps } from './typings';
import LazySizes from '../../blocks/LazySizes';
import imageUrlsToLazySizesProps from '../../utils/imageUrlsToLazySizesProps';
import { purifyInnerHTML } from './../../utils/domPurify';

const CTA: FC<TCTAProps> = (props) => {
  const {
    className,
    imageUrls,
    imageUrlsStyle
  } = props;
  const ctaClass = classNames('cta', className, {
    'cta--with-image': imageUrls
  });

  return (
    <LazySizes.a href={props.linkUrl} className={ctaClass} {...imageUrlsToLazySizesProps(imageUrls, imageUrlsStyle)}>
      <span className="cta__title" dangerouslySetInnerHTML={purifyInnerHTML(props.title)} />
      <span className="cta__link">
        <Link linkText={props.linkText} />
      </span>
    </LazySizes.a>
  );
};

export default CTA;
