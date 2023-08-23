
import React, { FC } from 'react';
import { TImageProps } from './typings';
import LazySizes from '../../blocks/LazySizes';
import imageUrlsToLazySizesProps from '../../utils/imageUrlsToLazySizesProps';

const Image: FC<TImageProps> = ({ imageUrls, alt }) => {
  return (
    <LazySizes.img className="media-section__image" {...imageUrlsToLazySizesProps(imageUrls, 'Media')} alt={alt} />
  );
};

export default Image;