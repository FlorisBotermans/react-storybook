
import React, { FC, useRef } from 'react';
import { getOptionalAnchorProps } from '../../utils/anchorHelper';
import { TNavigationItemDefaultProps } from './typings';
import NavigationSection from './NavigationSection';
import { useItemFocus } from './effects';
import HomeIcon from '../../../icons/home.svg';
import FavoriteIcon from '../../../icons/favorite.svg';
import AppsIcon from '../../../icons/apps.svg';
import UserIcon from '../../../icons/user.svg';
import ChevronIcon from '../../../icons/chevron.svg';
import ExternalLinkIcon from '../../../icons/external-link.svg';
import EditIcon from '../../../icons/edit.svg';

const icons = {
  home: HomeIcon,
  favorite: FavoriteIcon,
  apps: AppsIcon,
  user: UserIcon,
  edit: EditIcon
};

const NavigationItem: FC<TNavigationItemDefaultProps> = ({ topOffset, icon, url, text, items }) => {
  const itemRef = useRef<HTMLLIElement>();
  const arrowRef = useRef<HTMLElement>();

  const hasItems = items?.length > 0;
  const [focused, setFocused, itemHandlers, linkHandlers] = useItemFocus(false, hasItems, itemRef, arrowRef);
  const Icon = icons[icon] || null;
  const anchorProps = getOptionalAnchorProps(url);

  return (
    <li ref={itemRef} className="navigation__list-item" {...itemHandlers}>
      <a href={url} className="navigation__list-link" {...anchorProps} {...linkHandlers}>
        {icon && <Icon className="navigation__list-icon" />}
        <span className="navigation__list-text">{text}</span>
        {(anchorProps.rel || hasItems) && (
          <span ref={arrowRef} className="navigation__list-arrow">
            {anchorProps.rel
              ? <ExternalLinkIcon className="navigation__list-arrow-icon navigation__list-arrow-icon--external" />
              : <ChevronIcon className="navigation__list-arrow-icon" />
            }
          </span>
        )}
      </a>
      {hasItems && <NavigationSection items={items} parentItemRef={itemRef} topOffset={topOffset} focused={focused} scrollable={true}
        onClose={(e) => {
          setFocused(false);
          e.currentTarget.blur();
        }} />}
    </li>
  );
};

export default NavigationItem;