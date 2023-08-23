import React, { FC, MouseEventHandler } from 'react';
import classNames from 'classnames';
import { purifyInnerHTML } from '../utils/domPurify';
import Link from './Link';

type Link = {
  linkText: string;
  linkUrl?: string;
  clickEvent?: MouseEventHandler;
}
export enum SidebarPosition {
  Left,
  Right
}
export enum SidebarContentPosition {
  Top,
  Center,
  SpaceAround
}
type Options = {
  compact: boolean;
  position: SidebarPosition;
  contentPosition: SidebarContentPosition;
  renderHeadline: boolean;
  className?: string;
}
export type TSidebarNavigationProps = {
  title?: string;
  links: Link[];
  location?: string;
  options?: Options;
};

const defaultOptions: Options = {
  compact: false,
  position: SidebarPosition.Right,
  contentPosition: SidebarContentPosition.SpaceAround,
  renderHeadline: false
};

const SidebarNavigation: FC<TSidebarNavigationProps> = ({ title = null, links = [], location = null, options = defaultOptions }) => {
  if (!links || links.length === 0) return null;

  const sidebarClass = classNames(
    'sidebar-nav',
    'theme-dark',
    options.className,
    {
      'sidebar-nav--position-left': options.position === SidebarPosition.Left,
      'sidebar-nav--position-right': options.position === SidebarPosition.Right,
      'sidebar-nav--content-top': options.contentPosition === SidebarContentPosition.Top,
      'sidebar-nav--content-center': options.contentPosition === SidebarContentPosition.Center,
      'sidebar-nav--content-space-around': options.contentPosition === SidebarContentPosition.SpaceAround,
      'sidebar-nav--compact': options.compact
    }
  );

  // eslint-disable-next-line jsx-a11y/heading-has-content
  const Title = (props) => options.renderHeadline ? <h1 {...props} /> : <h2 {...props} />;

  return (
    <nav className={sidebarClass}>
      <div className="sidebar-nav__container">
        {title &&
          <Title className="sidebar-nav__title" dangerouslySetInnerHTML={purifyInnerHTML(title)} />
        }
        <ul className="sidebar-nav__list">
          {links.map(navLink =>
            <li key={navLink.linkText} className="sidebar-nav__list-item">
              <Link onClick={navLink.clickEvent} linkText={navLink.linkText} linkUrl={navLink.linkUrl} isActive={location === navLink.linkUrl} />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default SidebarNavigation;