import React, { FC } from 'react';
import LoadingIcon from '../../../icons/loading.svg';
import CrossIcon from '../../../icons/cross.svg';
import Form from '../Form';
import { TAvailableOverviewProps, TGroupProps, TItemProps } from './types';
import { useAvailableItems } from './effects';
import AvailableOverviewItem from './AvailableOverviewItem';
import AvailableOverviewGroup from './AvailableOverviewGroup';

const AvailableOverview: FC<TAvailableOverviewProps> = ({
  title, url, addUrl, allText, addText, networkErrorMessage, addNetworkErrorMessage,
  emptyMessage, selectedItems, search, closeText, handleAdded, handleClosed
}) => {
  const [
    listedItems, categories, updating, error, selectedCategory, selectCategory, setSearchText, addItem
  ] = useAvailableItems(
    url, networkErrorMessage, addNetworkErrorMessage, selectedItems, addUrl, handleAdded
  );

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className="available-overview" onClick={e => {
      if (e.target !== e.currentTarget) return;
      handleClosed();
    }}>
      <div className="available-overview__overlay">
        <button className="available-overview__close-btn" onClick={handleClosed}>
          <CrossIcon className="available-overview__close-icon" title={closeText} />
        </button>
        <nav className="available-overview__nav">
          <h2 className="available-overview__title">{title}</h2>
          <ul className="available-overview__categories">
            <li className="available-overview__categories-item">
              <button
                className="available-overview__category"
                onClick={() => selectCategory(undefined)}
                disabled={selectedCategory === undefined}
              >
                {allText}
              </button>
            </li>
            {categories?.length > 0 && <div className="available-overview__categories-divider"></div>}
            {categories.map(category => (
              <li className="available-overview__categories-item" key={category}>
                <button
                  className="available-overview__category"
                  onClick={() => selectCategory(category)}
                  disabled={category === selectedCategory}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="available-overview__overview">
          {search && (
            <div className="available-overview__search">
              <Form
                name="searchform"
                actionIsResultsUrl={true}
                onSubmit={() => false}
                onChange={(values) => setSearchText(values.searchText)}
                fields={[{
                  name: 'searchText',
                  type: 'searchtext',
                  label: '',
                  value: '',
                  placeholder: search.placeholderText,
                  buttonText: search.btnText,
                  isRequired: false
                }]}
              />
            </div>
          )}
          <ul className="available-overview__list">
            {(error && !updating) && <div className="available-overview__error">{error}</div>}
            {(!(listedItems?.length > 0) && !updating && !error) && <div className="available-overview__empty-message">{emptyMessage}</div>}
            {listedItems?.map(listedItem => {
              const group = listedItem as TGroupProps;
              if (group.items) return <AvailableOverviewGroup key={group.title} {...group} addText={addText} addItem={addItem} />;

              const item = listedItem as TItemProps;
              return <AvailableOverviewItem key={JSON.stringify(item.id)} {...item} addText={addText} addItem={addItem} />;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default AvailableOverview;