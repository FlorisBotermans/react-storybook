import React, { FC } from 'react';
import { purifyInnerHTML } from '../utils/domPurify';

type TProps = {
  text: string;
};

const Content: FC<TProps> = ({ text = '' }) => {
  return (
    <article dangerouslySetInnerHTML={purifyInnerHTML(text)} />
  );
};

export default Content;
