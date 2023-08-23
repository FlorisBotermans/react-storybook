
import React, { FC, useEffect } from 'react';
import { TNavigationProps } from './typings';
import classNames from 'classnames';
import { getThemeClass } from '../../utils/theme';
import NavigationSection from './NavigationSection';
import { useNavigation, useScrollHints } from './effects';
import HamburgerIcon from '../../../icons/hamburger.svg';
import HamburgerCloseIcon from '../../../icons/hamburger-close.svg';
import { useIsomorphicLayoutEffect } from '../../utils/serverSide/rendering';
import Cookies from 'js-cookie';

const Navigation: FC<TNavigationProps> = ({ accent = 1, open: stickyProp = false, logo, mainItems, navItems }) => {
  const [topRef, topScrollHint, bottomRef, bottomScrollHint] = useScrollHints();
  const [sticky, toggleSticky] = useNavigation(stickyProp);
  useEffect(() => {
    Cookies.set('navigation-sticky', sticky.toString(), {
      expires: 365
    });
  }, [sticky]);
  useIsomorphicLayoutEffect(() => {
    document.body.classList.toggle('body--navigation-sticky', sticky);
  }, [sticky]);

  return (
    <div className={classNames('navigation', getThemeClass(accent))}>
      <div className="navigation__logo">
        <div className="navigation__logo-background-container">
          {(logo?.url && logo?.imageUrl) && (
            <a href={logo.url} className="navigation__logo-link">
              <img alt="Logo" src={logo.imageUrl} className="navigation__logo-image"/>
              <span className="navigation__logo-text">{logo.text}</span>
            </a>
          )}
        </div>
        <button className="navigation__toggle" onClick={toggleSticky}>
          {sticky
            ? <HamburgerCloseIcon className="navigation__toggle-icon" title="Close navigation" />
            : <HamburgerIcon className="navigation__toggle-icon" title="Open navigation" />
          }
        </button>
      </div>
      <div className="navigation__container">
        <div className="navigation__background-container">
          <div className="skiplink-target" id="main-menu" tabIndex={-1}></div>
          <div className={classNames(
            'navigation__content',
            { 'navigation__content--top-hint': topScrollHint },
            { 'navigation__content--bottom-hint': bottomScrollHint }
          )}>
            <div className="navigation__scroller">
              <div ref={topRef} className="navigation__scroll-top-detection"></div>
              {mainItems?.length > 0 && (
                <nav aria-label="Main navigation">
                  <NavigationSection items={mainItems} focused={true} />
                </nav>
              )}
              {navItems?.length > 0 && (
                <>
                  <hr className="navigation__separator" />
                  <nav aria-label="Navigation">
                    <NavigationSection items={navItems} focused={true} />
                  </nav>
                </>
              )}
              <div ref={bottomRef} className="navigation__scroll-bottom-detection"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
