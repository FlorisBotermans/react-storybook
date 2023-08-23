import React, { FC } from 'react';
import classNames from 'classnames';

export type BreadCrumbViewModel = {
  text: string;
  url: string;
};

const BreadCrumb: FC<{ list: BreadCrumbViewModel[]; className?: string, ellipsis?: boolean }> = ({ list = [], className, ellipsis = false }) => {
  if (!list || list.length === 0) return null;
  const breadCrumbClass = classNames(
    'breadcrumb',
    className,
    { 'breadcrumb--ellipsis': ellipsis }
  );
  return (
    <nav className={breadCrumbClass}>
      <ul className="breadcrumb__list">
        {list.map(({ text, url }) => (
          <li key={text} className="breadcrumb__item">
            <a href={url} className="breadcrumb__item-link">
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export type TBreadCrumbProps = BreadCrumbViewModel;
export default BreadCrumb;
