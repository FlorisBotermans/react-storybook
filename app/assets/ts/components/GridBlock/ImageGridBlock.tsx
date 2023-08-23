import React, { FunctionComponent } from 'react';
import GridBlock, { TGridBlock } from './GridBlock';

type TProps = TGridBlock & {
  type: string;
  title: string;
  imageUrls: string[];
  linkUrl: string;
};

const ImageGridBlock: FunctionComponent<TProps> = (props) => {
  return (
    <GridBlock type={props.type} imageUrls={props.imageUrls} title={props.title} linkUrl={props.linkUrl} className="grid-block--image-only" />
  );
};

export type TImageGridBlockProps = TProps;
export default ImageGridBlock;
