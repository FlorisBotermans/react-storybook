import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import GridBlock, { TGridBlock } from './GridBlock';

type ContentGridBlockOptions = {
  negative: boolean;
};

const defaultOptions: ContentGridBlockOptions = {
  negative: false
};

type TProps = TGridBlock & {
  options?: ContentGridBlockOptions;
};

const ContentGridBlock: FunctionComponent<TProps> = (props) => {
  const { options = defaultOptions } = props;
  const gridBlockClass = classNames({
    'grid-block--negative': options.negative
  });
  return (
    <GridBlock {...props} className={gridBlockClass} />
  );
};

export type TContentGridBlockProps = TProps;
export default ContentGridBlock;
