import React, { FC } from 'react';
import classNames from 'classnames';
import slugify from '../utils/slugify';
import BreadCrumb, { BreadCrumbViewModel } from './Breadcrumb';
import { removeHTML, purifyInnerHTML } from '../utils/domPurify';
import LazySizes from '../blocks/LazySizes';
import imageUrlsToLazySizesProps from '../utils/imageUrlsToLazySizesProps';
import Tooltip from '../blocks/Tooltip';

type TProps = {
  id?: string;
  pageTitle: string;
  title: string;
  anchor: string;
  imageUrls?: string[];
  imageCredits?: string;
  renderHeadline: boolean;
  breadcrumb?: BreadCrumbViewModel[];
}

type TPageTitleProps = {
  renderHeadline: boolean;
  className?: string;
  title: string;
}

function PageTitle(props: TPageTitleProps): JSX.Element {
  const {
    renderHeadline,
    className,
    title
  } = props;
  const pageTitleClass = classNames('anchor__page-title', className);
  return renderHeadline ? <h1 className={pageTitleClass} dangerouslySetInnerHTML={purifyInnerHTML(title)} /> : <span className={pageTitleClass} dangerouslySetInnerHTML={purifyInnerHTML(title)}/>;
}

const AnchorSection: FC<TProps> = (props) => {
  const {
    id,
    pageTitle,
    title,
    anchor,
    imageUrls,
    imageCredits,
    renderHeadline,
    breadcrumb = []
  } = props;

  const attributes: React.HTMLAttributes<HTMLDivElement> = {};
  if (anchor) {
    attributes['data-anchor'] = removeHTML(anchor);
    attributes.id = slugify(anchor);
  }

  return (
    <section id={id}>
      <div className="anchor" {...attributes}>
        {imageUrls &&
          <LazySizes.div className="anchor-hero" {...imageUrlsToLazySizesProps(imageUrls, 'Anchor') }>
            <div className="anchor-hero__container">
              <div className="container container--center-wide container--margin">
                <span className="h1 anchor-hero__title" dangerouslySetInnerHTML={purifyInnerHTML(pageTitle)}/>
                <span className="h1 anchor-hero__subtitle">{removeHTML(anchor)}</span>
              </div>
            </div>
            {imageCredits &&
              <div className="anchor-hero__credits-container">
                <div className="anchor-hero__credits">
                  <Tooltip text={imageCredits} />
                </div>
              </div>
            }
          </LazySizes.div>
        }
        <div className="container container--clearfix">
          <div className="container container--center container--margin">
            <BreadCrumb className="anchor__breadcrumb" list={breadcrumb} />
            <PageTitle renderHeadline={renderHeadline} className="anchor__title" title={pageTitle} />
            {title &&
              <h2 className="h2 anchor__subtitle">{removeHTML(title)}</h2>
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export type TAnchorSectionProps = TProps;
export default AnchorSection;
