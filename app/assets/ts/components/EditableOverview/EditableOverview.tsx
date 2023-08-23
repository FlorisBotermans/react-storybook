import React, { FC, useRef, useState } from 'react';
import { TEditableOverviewProps } from './types';
import { useItems, useSortable } from './effects';
import EditableOverviewItem from './EditableOverviewItem';
import LoadingIcon from '../../../icons/loading.svg';
import PlusIcon from '../../../icons/plus.svg';
import AvailableOverview from './AvailableOverview';

const EditableOverview: FC<TEditableOverviewProps> = ({
  url, emptyMessage, networkErrorMessage, addUrl, addText, deleteUrl, orderUrl, availableOverview
}) => {
  const [items, updating, error, handleAdded, handleDeleted, handleOrdered] = useItems(url, networkErrorMessage, orderUrl);
  const listRef = useRef(null);
  useSortable(listRef, items, handleOrdered);
  const [availableOverviewVisible, setAvailableOverviewVisible] = useState(false);

  return (
    <>
      <div className="editable-overview">
        {updating && <div className="editable-overview__updating"><LoadingIcon className="editable-overview__updating-icon"/></div>}
        {(availableOverview && addUrl && addText) && (
          <button className="editable-overview__add-btn" onClick={() => setAvailableOverviewVisible(true)}>
            <PlusIcon className="editable-overview__add-icon" />
            <span className="editable-overview__add-text">{addText}</span>
          </button>
        )}
        {(error && !updating) && <div className="editable-overview__error">{error}</div>}
        {(!(items?.length > 0) && !updating && !error) && <div className="editable-overview__empty">{emptyMessage}</div>}
        <ul className="editable-overview__list" ref={listRef}>
          {items.map((item) => (
            <EditableOverviewItem key={JSON.stringify(item?.id)} deletedCallback={handleDeleted} deleteUrl={deleteUrl}
              networkErrorMessage={networkErrorMessage} {...item} />
          ))}
        </ul>
      </div>
      {availableOverviewVisible && (
        <AvailableOverview {...availableOverview} addUrl={addUrl} addText={addText} selectedItems={items.map(item => item.id)}
          handleClosed={() => setAvailableOverviewVisible(false)} handleAdded={handleAdded} />
      )}
    </>
  );
};
export default EditableOverview;