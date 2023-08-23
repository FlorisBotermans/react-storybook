import React, { FC, useEffect, useRef } from 'react';
import FavoriteIcon from '../../../icons/favorite.svg';
import DragIcon from '../../../icons/drag.svg';
import TrashIcon from '../../../icons/trash.svg';
import LoadingIcon from '../../../icons/loading.svg';
import ExternalLinkIcon from '../../../icons/external-link.svg';
import { useFollow } from '../../blocks/Follow/effects';
import { TEditableOverviewItemProps } from './types';
import { getOptionalAnchorProps } from '../../utils/anchorHelper';
import classNames from 'classnames';
import { useDeleteUrlToUnfollowUrlSelector } from './selectors';

const EditableOverviewItem: FC<TEditableOverviewItemProps> = ({
  id, title, url, icon, description, supportLink, supportLinkText, deleteUrl, deletedCallback, networkErrorMessage
}) => {
  const unfollowUrl = useDeleteUrlToUnfollowUrlSelector(deleteUrl, id);
  const [following, toggle, updating, error] = useFollow(
    true, undefined, unfollowUrl, networkErrorMessage, 250
  );
  const className = classNames('editable-overview-item', { 'editable-overview-item--has-description': !!description });
  const linkRef = useRef(null);
  const urlAnchorProps = getOptionalAnchorProps(url);
  const supportLinkAnchorProps = getOptionalAnchorProps(supportLink);

  // Remove from the list once deleted on the server
  useEffect(() => {
    if (following) return;

    deletedCallback(id);
  }, [id, deletedCallback, following]);

  return (
    <li className={className} data-draggable-id={id}>
      <div className="editable-overview-item__content">
        <div className="editable-overview-item__drag" data-draggable-hook>
          <DragIcon data-testid={'test' + id} className="editable-overview-item__drag-icon" />
        </div>
        {(icon === 'favorite')
          ? <FavoriteIcon className="editable-overview-item__favorite-icon" />
          : icon
            ? <img alt="" src={icon} className="editable-overview-item__icon" />
            : null
        }
        <div className="editable-overview-item__group">
          <div className="editable-overview-item__row">
            <a ref={linkRef} href={url} {...urlAnchorProps} className="editable-overview-item__link">
              <span className="editable-overview-item__title">{title}</span>
              {urlAnchorProps.rel && (
                <ExternalLinkIcon className="editable-overview-item__external-icon" />
              )}
            </a>
            {description && <div className="editable-overview-item__description mobile-hide">{description}</div>}
            {supportLink && (
              <a href={supportLink} {...supportLinkAnchorProps} className="editable-overview-item__support mobile-hide">
                {supportLinkText}
              </a>
            )}
            <button className="editable-overview-item__btn" disabled={updating || !following} onClick={toggle}>
              {updating
                ? <LoadingIcon className="editable-overview-item__updating-icon" />
                : <TrashIcon data-testid={id} className="editable-overview-item__delete-icon" />
              }
            </button>
          </div>
          {description && <div className="editable-overview-item__description mobile-only">{description}</div>}
          {supportLink && (
            <a href={supportLink} {...supportLinkAnchorProps} className="editable-overview-item__support mobile-only">
              {supportLinkText}
            </a>
          )}
          {error && <div className="editable-overview-item__error">{error}</div>}
        </div>
      </div>
    </li>
  );
};
export default EditableOverviewItem;