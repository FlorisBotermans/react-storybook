import React from 'react';
import classNames from 'classnames';
import ArrowIcon from '../../icons/arrow-scalable.svg';

interface FullscreenBlockViewModel {
  className?: string;
  title: string;
  linkText: string;
  linkUrl: string;
  hasColoredBackground?: boolean;
}

export default function FullscreenBlock(props: FullscreenBlockViewModel): JSX.Element {
  const {
    className,
    title = '',
    linkUrl = '',
    linkText = '',
    hasColoredBackground = false
  } = props;
  const liClassName = classNames(
    'fullscreen-block',
    { 'fullscreen-block--colored-background': hasColoredBackground },
    className);

  return (
    <li className={liClassName}>
      <a className="fullscreen-block__link" href={linkUrl}>
        <span className="fullscreen-block__content">
          <span className="fullscreen-block__title">{title}</span>
          <span className="fullscreen-block__description">
            <span className="fullscreen-block__description-text">
              {linkText}
            </span>
            <ArrowIcon className="fullscreen-block__link-icon" />
          </span>
        </span>
      </a>
    </li>
  );
}
