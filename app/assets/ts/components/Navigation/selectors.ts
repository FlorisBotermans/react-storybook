import { useMemo } from 'react';
import { TNavigationItem, TNavigationItemDefault, TNavigationItemHeader, TNavigationItemSeparator, TNavigationList } from './typings';

const navigationItemsToLists = (items: TNavigationItem[]) => items.reduce((lists: TNavigationList[], item) => {
  let lastList = lists[lists.length - 1];
  if (lists.length === 0 || item.type === 'header' || lastList.separator) {
    lists.push({
      items: []
    });
    lastList = lists[lists.length - 1];
  }

  switch (item.type) {
    case 'header':
      lastList.header = item as TNavigationItemHeader;
      break;
    case 'separator':
      lastList.separator = item as TNavigationItemSeparator;
      break;
    default:
      lastList.items.push(item as TNavigationItemDefault);
  }

  return lists;
}, []);

export const useNavigationItemsToListsSelector = (items: TNavigationItem[]): TNavigationList[] =>
  useMemo(() => navigationItemsToLists(items), [items]);