import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import imageUrlsToLazySizesProps from '../../utils/imageUrlsToLazySizesProps';
import LazySizes from '../../blocks/LazySizes';
import { purifyInnerHTML } from '../../utils/domPurify';

type TProps = {
  type: string;
  imageUrls: string[];
  linkUrl?: string;
  title?: string;
  subTitle?: string;
  className?: string;
}

type TGridBlockContentProps = {
  title: string;
  subTitle: string;
  children: ReactNode
}

const GridBlockContent: FC<TGridBlockContentProps> = (props) => (
  <span className="grid-block__content">
    <span className="grid-block__content-title" dangerouslySetInnerHTML={purifyInnerHTML(props.title)} />
    {props.subTitle &&
      <small className="grid-block__content-subtitle">
        {props.subTitle}
      </small>
    }
    {props.children}
  </span>
);

type TGridBlockElementProps = {
  children: ReactNode;
  href?: string;
  srcSet: string;
  [rest: string]: unknown;
}

const GridBlockElement: FC<TGridBlockElementProps> = (props) => {
  const {
    href = null,
    children,
    ...otherProps
  } = props;

  if (href) return <LazySizes.a href={href} {...otherProps}>{children}</LazySizes.a>;
  return <LazySizes.span {...otherProps}>{children}</LazySizes.span>;
};

const GridBlock: FC<TProps> = (props) => {
  const {
    type = '',
    imageUrls = [],
    title = null,
    subTitle = null,
    linkUrl = null,
    className = null,
    children
  } = props;
  const gridClass = classNames('grid-block', className);
  const containsContent = title || subTitle;
  return (
    <GridBlockElement href={linkUrl} className={gridClass} {...imageUrlsToLazySizesProps(imageUrls, 'Block')}>
      <span className="grid-block__type">
        {type}
      </span>
      {containsContent
        ? <GridBlockContent title={title} subTitle={subTitle}>{children}</GridBlockContent>
        : children
      }
    </GridBlockElement>
  );
};

export type TGridBlock = TProps;
export default GridBlock;
