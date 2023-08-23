import React, { FunctionComponent } from 'react';
import GridBlock from './GridBlock';

type TProps = {
  title: string;
  type: string;
  imageUrls: string[];
  linkUrl: string;
  date: Date;
};

const NewsGridBlock: FunctionComponent<TProps> = (props) => {
  return (
    <GridBlock {...props} />
  );
};

export type TNewsGridBlockProps = TProps;
export default NewsGridBlock;
