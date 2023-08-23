import React from 'react';
import classNames from 'classnames';
import HamburgerIcon from '../../../icons/hamburger.svg';
import SearchIcon from '../../../icons/search.svg';
import ChevronIcon from '../../../icons/chevron.svg';
import CrossIcon from '../../../icons/cross.svg';
import { TTopNavigationProps } from './typings';
import { getThemeClass } from '../../utils/theme';
import NavigationSection from '../Navigation/NavigationSection';
import Search from '../Search';
import { useAccountMenu, useNavigation } from './effects';
import { useIsomorphicLayoutEffect } from '../../utils/serverSide/rendering';
import LanguageSwitch from '../../blocks/LanguageSwitch';

const TopNavigation = ({ accent, navigation, breadcrumbs, account, language, search }: TTopNavigationProps) => {
  const [accountRef, accountMenuVisible, setAccountMenuVisible, handleAccountClose] = useAccountMenu();
  const [searchRef, searchVisible, toggleSearch, navigationVisible, toggleNavigation] = useNavigation();

  useIsomorphicLayoutEffect(() => {
    document.body.classList.toggle('body--search-visible', searchVisible);
  }, [searchVisible]);
  useIsomorphicLayoutEffect(() => {
    document.body.classList.toggle('body--navigation-visible', navigationVisible);
  }, [navigationVisible]);

  const className = classNames(
    getThemeClass(accent),
    'top-navigation',
    { 'top-navigation--search-visible': searchVisible },
    { 'top-navigation--no-search': !search }
  );

  return (
    <div className={className}>
      <div className="top-navigation__overlay">
        <div className="top-navigation__container">
          <div className="top-navigation__top">
            <div className="top-navigation__top-container">
              <nav aria-label="Breadcrumbs" className="top-navigation__breadcrumbs">
                <ul className="top-navigation__breadcrumbs-list">
                  {breadcrumbs.map((item, i) => (
                    <li className="top-navigation__breadcrumb" key={i}>
                      {item.url
                        ? <a className="top-navigation__breadcrumb-link" href={item.url}>{item.text}</a>
                        : <span className="top-navigation__breadcrumb-text">{item.text}</span>
                      }
                    </li>
                  ))}
                </ul>
              </nav>

              <nav aria-label="Account navigation" className="top-navigation__account navigation__list-item" ref={accountRef}>
                <button className={classNames('top-navigation__toggle', { 'top-navigation__toggle--toggled': accountMenuVisible })} title={account.name} onClick={() => setAccountMenuVisible(!accountMenuVisible)}>
                  <div className="top-navigation__account-info">
                    <div className="top-navigation__account-name">{account.name}</div>
                    <ChevronIcon className="top-navigation__toggle-icon" />
                  </div>
                </button>
                {account.items?.length > 0 && (
                  <NavigationSection
                    items={account.items}
                    focused={accountMenuVisible}
                    scrollable={true}
                    onClose={handleAccountClose}
                  />
                )}
              </nav>
              {language && (
                <div className="top-navigation__language-switch-btn">
                  <LanguageSwitch {...language} />
                </div>
              )}
            </div>
          </div>
          {search && (
            <div className="top-navigation__search" ref={searchRef}>
              <div className="top-navigation__search-container">
                <div className="top-navigation__search-content">
                  <button className="top-navigation__search-close" onClick={toggleSearch}>
                    <CrossIcon className="top-navigation__search-close-icon" />
                  </button>
                  <Search {...search} noHeader={true} actionIsResultsUrl={true} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <nav className={classNames('bottom-navigation', getThemeClass(accent))}>
        <ul className='bottom-navigation__list'>
          <li className="bottom-navigation__item"></li>
          <li className="bottom-navigation__item">
            <button className="bottom-navigation__btn bottom-navigation__btn--highlight" onClick={toggleNavigation}>
              <span className="bottom-navigation__icon-highlight">
                <HamburgerIcon className="bottom-navigation__icon--open" />
                <CrossIcon className="bottom-navigation__icon--close" />
              </span>
              <span className="bottom-navigation__text">{navigation.text}</span>
            </button>
          </li>
          <li className="bottom-navigation__item">
            {search && (
              <button className="bottom-navigation__btn" onClick={toggleSearch}>
                <SearchIcon className="bottom-navigation__icon" />
                <span className="bottom-navigation__text">{search.text}</span>
              </button>
            )}
          </li>
        </ul>
      </nav>
      <div className="skiplinks">
        <div className="container container--center-wide">
          <ul className="skiplinks__list">
            <li className="skiplinks__item">
              <a className="skiplinks__btn" href="#main-content">Ga naar de hoofdcontent</a>
            </li>
            <li className="skiplinks__item">
              <a className="skiplinks__btn" href="#main-menu" onClick={toggleNavigation}>Ga naar het hoofdmenu</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;