import { useCallback, useEffect, useState } from 'react';
import { TTabItem } from './typings';
import { useIsomorphicLayoutEffect } from '../../utils/serverSide/rendering';

const isCurrentUrl = (url) => {
  if (!url) return false;

  // absolute
  if (location.href.indexOf(url) === 0) return true;

  // query without relative url
  const isOnlyQueryUrl = url.split('#')[0].split('?')[0].length === 0;
  if (isOnlyQueryUrl) {
    return url === `${location.search}${location.hash}`;
  }

  // relative
  const pageUrl = url.split('#')[0].split('?')[0].split('/').filter(part => part).join('/');
  const currentPageUrl = location.pathname.split('/').filter(part => part).join('/');
  return pageUrl === currentPageUrl;
};

export const useTabs = (items: TTabItem[]) => {
  const [tabs, setTabs] = useState<TTabItem[]>(items);

  const updateActiveStates = useCallback(() => {
    const newTabs = items.map(({ title, url }) => ({
      title,
      url,
      active: isCurrentUrl(url)
    }));
    setTabs(newTabs);
  }, [items]);

  useEffect(() => {
    updateActiveStates();
  }, [updateActiveStates, items]);

  useIsomorphicLayoutEffect(() => {
    window.addEventListener('popstate', updateActiveStates);
    return () => window.removeEventListener('popstate', updateActiveStates);
  }, [updateActiveStates]);

  return [tabs];
};