import React, { FC } from 'react';
import PlusIcon from '../../../icons/plus.svg';
import { TAvailableOverviewItemProps } from './types';

const AvailableOverviewItem: FC<TAvailableOverviewItemProps> = ({
  id, title, icon, description, addText, addItem
}) => {
  return (
    <li className="available-overview-item" key={JSON.stringify(id)}>
      <div className="available-overview-item__content">
        {icon && <img className="available-overview-item__icon" src={icon} alt="" />}
        <div className="available-overview-item__info">
          <div className="available-overview-item__title">{title}</div>
          <div className="available-overview-item__descriptiont">{description}</div>
        </div>
        <button className="available-overview-item__add-btn" onClick={() => addItem(id)}>
          <PlusIcon data-testid={title} className="available-overview-item__add-icon" />
          <span className="available-overview-item__add-text">{addText}</span>
        </button>
      </div>
    </li>
  );
};
export default AvailableOverviewItem;