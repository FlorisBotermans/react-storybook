import React, { FC } from 'react';
import LazySizes from '../../blocks/LazySizes';
import { purifyInnerHTML } from '../../utils/domPurify';
import BreadCrumb, { BreadCrumbViewModel } from '../Breadcrumb';
import imageUrlsToLazySizesProps from '../../utils/imageUrlsToLazySizesProps';

type TProps = {
  imageUrls?: string[];
  imageAlt?: string;
  title: string;
  introPrefix?: string;
  intro: string;
  // pageType: string;
  url: string;
  breadcrumb: BreadCrumbViewModel[];
}

const SearchResultItem: FC<TProps> = (props) => {
  const {
    imageUrls,
    imageAlt,
    title,
    introPrefix,
    intro,
    // pageType,
    url,
    breadcrumb = []
  } = props;

  return (
    <li className="search-result">
      {(imageUrls && imageUrls.length) ? <LazySizes.img {...imageUrlsToLazySizesProps(imageUrls, 'SearchResult')} alt={imageAlt} className="search-result__image" /> : null}
      <div className="search-result__info">
        <h2 className="search-result__title">
          <a href={url} dangerouslySetInnerHTML={purifyInnerHTML(title)} />
        </h2>
        <BreadCrumb className="search-result__breadcrumb" list={breadcrumb} ellipsis={true} />
        <div className="search-result__intro">
          {introPrefix && <div className="search-result__intro-prefix">{introPrefix}</div>}
          {intro && <div className="search-result__intro-text" dangerouslySetInnerHTML={purifyInnerHTML(intro)} />}
        </div>
        {/* <div className="search-result__row">
          {pageType && <div className="search-result__page-type">{pageType}</div>}
        </div> */}
      </div>
    </li>
  );
};

export type TSearchResultItemProps = TProps;
export default SearchResultItem;