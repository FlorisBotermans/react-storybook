import React, { FunctionComponent } from 'react';
import GridBlock from './GridBlock';

type TProps = {
  title: string;
  type: string;
  imageUrls: string[];
  linkUrl: string;
  school: string;
};

const EducationGridBlock: FunctionComponent<TProps> = (props) => {
  const {
    school = ''
  } = props;

  return (
    <GridBlock {...props} subTitle={school} />
  );
};

export type TEducationGridBlockProps = TProps;
export default EducationGridBlock;
