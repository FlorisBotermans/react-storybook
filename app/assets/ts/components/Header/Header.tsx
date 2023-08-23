import React from 'react';
import classNames from 'classnames';
import { THeaderProps } from './typings';
import imageUrlsToLazySizesProps from '../../utils/imageUrlsToLazySizesProps';
import { purifyInnerHTML } from '../../utils/domPurify';
import LazySizes from '../../blocks/LazySizes';
import Follow from '../../blocks/Follow/Follow';
import LanguageSwitch from '../../blocks/LanguageSwitch';

const Header = ({ title, information, image, follow, language }: THeaderProps) => {
  return (
    <header className={classNames(
      'theme-dark',
      'header',
      { 'header--fallback-image': image?.isFallback }
    )}>
      <LazySizes.div className="header__image-container" {...imageUrlsToLazySizesProps(image?.imageUrls, image?.isFallback ? 'Header' : 'HeaderFallback')}>
        <div className="header__container">
          <div className="header__content-background">
            <div className="header__content">
              {title && <h1 className="header__title">{title}</h1>}
              <div className="header__btns">
                {follow && <Follow {...follow} />}
                {language && (
                  <div className="header__language-switch-btn">
                    <LanguageSwitch {...language} />
                  </div>
                )}
              </div>
            </div>
          </div>
          {information && (
            <section className="header__information">
              <div className="header__information-content" dangerouslySetInnerHTML={purifyInnerHTML(information)} />
            </section>
          )}
        </div>
      </LazySizes.div>
    </header>
  );
};

export default Header;