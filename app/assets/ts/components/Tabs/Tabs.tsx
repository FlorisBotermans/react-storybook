import React, { FC } from 'react';
import classNames from 'classnames';
import HorizontalScrollbar from '../../blocks/HorizontalScrollbar';
import { TTabsProps } from './typings';
import { useTabs } from './effects';

const Tabs: FC<TTabsProps> = ({ items }) => {
  const [tabs] = useTabs(items);

  return (
    <div className="container container--margin-bottom">
      <div className="container container--center-wide">
        <nav className="tabs" aria-label="Tabs">
          <HorizontalScrollbar render={() => (
            <ul className="tabs__list">
              {tabs.map(({ title, url, active }, i) =>
                <li key={i} className="tabs__item">
                  <a href={url} title={title} className={classNames('tabs__button', {
                    'tabs__button--active': active
                  })}>
                    {title}
                  </a>
                </li>
              )}
            </ul>
          )} />
        </nav>
      </div>
      <hr className="line line--no-margin" />
    </div>
  );
};

export default Tabs;
