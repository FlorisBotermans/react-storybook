import React, { FC, useState } from 'react';
import classNames from 'classnames';

import { TBlockGridSectionProps, GridSectionItem, GridSectionTheme } from './typings';
import { PageType } from '../../typings/blocks';

import HorizontalScrollbar from '../../blocks/HorizontalScrollbar';
import BlockGrid from './BlockGrid';
import Section from '../Containers/Section';

const getInitialState = (items: GridSectionItem[]): PageType => {
  return items && items.length > 0 ? items[0].pageType : null;
};

const getTabClass = (tab: { title: string, pageType: PageType }, currentFilter: PageType) => {
  return classNames('tabs__button', {
    'tabs__button--active': tab.pageType === currentFilter
  });
};

// TODO: Refactor Tabs to a functional component and make it more generic for reusability.
// TODO: Horizontal Scrollbar needs an option for always showing the scrollbar (no viewport), now the tabs can't be scrolled on smaller devices
// TODO: BlockGrid support for IE11
const BlockGridSection: FC<TBlockGridSectionProps> = (props) => {
  const {
    id,
    items = [],
    theme = GridSectionTheme.Primary
  } = props;

  const [filter, set] = useState<PageType>(getInitialState(items));
  const tabTitles = items.map(item => ({ title: item.title, pageType: item.pageType }));
  const blocksGridProps = items.find(item => item.pageType === filter);

  return (
    <Section id={id} className="block-grid-section">
      {tabTitles && tabTitles.length > 1 &&
        <nav className="tabs">
          <HorizontalScrollbar className="block-grid-section__tabs-container" render={() => (
            <ul className="tabs__list">
              {tabTitles.map(tab =>
                <li key={tab.pageType} className="tabs__item">
                  <button onClick={() => set(tab.pageType)} className={getTabClass(tab, filter)}>
                    {tab.title}
                  </button>
                </li>
              )}
            </ul>
          )} />
        </nav>
      }
      {blocksGridProps ? <BlockGrid {...blocksGridProps} theme={theme} /> : null}
    </Section>
  );
};

export default BlockGridSection;
