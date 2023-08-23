import React from 'react';
import classNames from 'classnames';
import LoadingIcon from '../../../icons/loading.svg';
import FavoriteIcon from '../../../icons/favorite.svg';
import { useFollow } from './effects';
import { TFollowProps } from './typings';

const Follow = ({ following: followingProp, url, unfollowUrl, networkErrorMessage }: TFollowProps) => {
  const [following, toggle, updating, error] = useFollow(followingProp, url, unfollowUrl, networkErrorMessage, 1000);
  if (!url) return;

  return (
    <div className={classNames('follow', { 'follow--following': following }, { 'follow--error': error })}>
      <button className="follow__btn" disabled={!url || updating} onClick={toggle}>
        {updating
          ? <LoadingIcon className="follow__updating" />
          : <FavoriteIcon className="follow__icon" />
        }
      </button>
      {error && <div className="follow__error">{error}</div>}
    </div>
  );
};

export default Follow;