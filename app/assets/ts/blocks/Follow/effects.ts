import { useState } from 'react';

export const useFollow = (followingProp: boolean, url?: string, unfollowUrl?:string, networkErrorMessage?: string, updatingMinDuration = 0): [boolean, () => void, boolean, string] => {
  const [following, setFollowing] = useState(followingProp);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string>();

  const toggle = async () => {
    if (
      updating ||
      (following ? !unfollowUrl : !url)
    ) return;

    setError(undefined);
    setUpdating(true);
    const start = performance.now();

    let response;
    try {
      response = await fetch(following ? unfollowUrl : url, {
        method: following ? 'DELETE' : 'PUT'
      });
    } catch (error) {
      setError(networkErrorMessage || error.message);
      setUpdating(false);
      return;
    }

    try {
      if (!response.ok) throw Error(await response.text() || response.statusText || response.status.toString());
      const duration = performance.now() - start;
      if (duration < updatingMinDuration) {
        await new Promise((resolve) => setTimeout(resolve, updatingMinDuration - duration));
      }
      setFollowing((followed) => !followed);
    } catch (error) {
      setError(error.message);
    }

    setUpdating(false);
  };

  return [following, toggle, updating, error];
};
