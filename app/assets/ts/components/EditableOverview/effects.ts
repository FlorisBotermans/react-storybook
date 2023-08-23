import { Plugins, Sortable } from '@shopify/draggable';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useIsomorphicLayoutEffect } from '../../utils/serverSide/rendering';
import { createURL } from '../../utils/url';
import { TItemProps, TGroupProps } from './types';

export const useItems = (
  url: string, networkErrorMessage: string, orderUrl: string
): [
  TItemProps[], boolean, string,
  (item: TItemProps) => void,
  (id: object) => void,
  (id: object, order: object[]) => Promise<void>
] => {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState();
  const [items, setItems] = useState<TItemProps[]>([]);

  // load items
  useIsomorphicLayoutEffect(() => {
    (async () => {
      if (!url) return;

      setError(undefined);
      setUpdating(true);

      try {
        const response = await fetch(url);
        if (!response.ok) throw Error(await response.text() || response.statusText || response.status.toString());

        const sortedItems = ((await response.json()) as TItemProps[]).sort((a, b) => a.index - b.index);
        setItems(sortedItems);
      } catch (error) {
        setError(networkErrorMessage || error.message);
      }

      setUpdating(false);
    })();
  }, [networkErrorMessage, url]);

  const handleAdded = useCallback((item: TItemProps) => {
    setItems([...items, item]);
  }, [items]);

  const handleDeleted = useCallback((id: object) => {
    setItems(items.filter(item => item.id !== id));
  }, [items]);

  const handleOrdered = useCallback(async (id: object, order: object[]) => {
    if (!orderUrl) return;

    setUpdating(true);

    try {
      // eslint-disable-next-line eqeqeq
      const sortedItems = order.map(id => items.find(item => item.id == id));
      const index = order.indexOf(id);
      setItems(sortedItems); // Render new order

      const requestUrl = createURL(orderUrl);
      requestUrl.searchParams.set('id', id as unknown as string);
      requestUrl.searchParams.set('index', index as unknown as string);
      const response = await fetch(requestUrl, { method: 'POST' });
      if (!response.ok) throw Error(await response.text() || response.statusText || response.status.toString());
    } catch (ex) {
      setItems([...items]); // Re-render original order
      setError(networkErrorMessage || ex.message);
    }

    setUpdating(false);
  }, [items, orderUrl, networkErrorMessage]);

  return [items, updating, error, handleAdded, handleDeleted, handleOrdered];
};

export const useSortable = (
  listRef: React.MutableRefObject<HTMLElement>,
  items: TItemProps[],
  handleOrdered: (id: unknown, order: unknown[]) => void
) => {
  const sortableRef = useRef<Sortable>();
  useIsomorphicLayoutEffect(() => {
    if (!listRef.current) return;

    const sortable = sortableRef.current = new Sortable(listRef.current, {
      draggable: '[data-draggable-id]',
      mirror: {
        appendTo: 'body',
        constrainDimensions: true,
        xAxis: false
      },
      distance: 5,
      plugins: [Plugins.SwapAnimation]
    });

    // IE11 Fix for dissappearing or untouchable items
    sortable.on('drag:start', (e) => {
      const target = e.originalEvent.target as HTMLElement;
      if (target.closest('[data-draggable-hook]')) return;

      e.cancel();
      [...(e.sourceContainer as HTMLElement).children]
        .forEach(elem => elem.setAttribute('style', ''));
    });
    sortable.on('sortable:stop', async (e) => {
      await new Promise(resolve => setTimeout(resolve, 0)); // Await html render
      const order: object[] = ([...listRef.current.querySelectorAll('[data-draggable-id]')] as HTMLElement[])
        .map(elem => elem.dataset.draggableId as unknown as object);
      // eslint-disable-next-line eqeqeq
      if (order.every((a, i) => a == items[i].id)) return; // order did not change

      // Fix for untouchable items that sometimes happens when the data-draggable-hook is selected rapidly
      [...(e.oldContainer as HTMLElement).children]
        .forEach(elem => elem.setAttribute('style', ''));

      const id = order[e.newIndex];
      handleOrdered(id, order);
    });
    return () => {
      if (!sortableRef.current) return;

      sortableRef.current.destroy();
      sortableRef.current = undefined;
    };
  }, [listRef.current, items, handleOrdered]);

  return [];
};

export const useAvailableItems = (
  url: string, networkErrorMessage: string, addNetworkErrorMessage: string, selectedItems: object[], addUrl: string,
  handleAdded: (item: TItemProps) => void
): [
  (TItemProps | TGroupProps)[], string[], boolean, string, string,
  (category: string) => void,
  (text: string, delay?: number) => void,
  (id: object) => void
] => {
  const [items, setItems] = useState<TItemProps[]>([]);
  const [deselectedItems, setDeselectedItems] = useState<TItemProps[]>([]);
  const [listedItems, setListedItems] = useState<(TItemProps | TGroupProps)[]>([]);
  const [selectedCategory, selectCategory] = useState<string>();
  const [categories, setCategories] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');

  // load items
  useIsomorphicLayoutEffect(() => {
    (async () => {
      if (!url) return;

      setError(undefined);
      setUpdating(true);

      try {
        const requestUrl = createURL(url);
        requestUrl.searchParams.set('searchText', searchText);
        const response = await fetch(requestUrl);
		console.log(response);
        if (!response.ok) throw Error(await response.text() || response.statusText || response.status.toString());

        const items = ((await response.json()) as TItemProps[]);
        setItems(items);
      } catch (error) {
        setError(networkErrorMessage || error.message);
      }

      setUpdating(false);
      console.log(updating);
    })();
  }, [networkErrorMessage, url, searchText]);

  const addItem = useCallback(async (id: object) => {
    try {
      const requestUrl = createURL(addUrl);
      requestUrl.searchParams.set('id', id as unknown as string);
      const response = await fetch(requestUrl, { method: 'PUT' });
      if (!response.ok) throw Error(await response.text() || response.statusText || response.status.toString());

      // eslint-disable-next-line eqeqeq
      const item = items.find(item => item.id == id);
      handleAdded({ ...item, index: selectedItems.length });
    } catch (error) {
      setError(addNetworkErrorMessage || error.message);
    }
  }, [items, addUrl, handleAdded, selectedItems.length, addNetworkErrorMessage]);

  useEffect(() => {
    const deselectedItems = items.filter(item => !selectedItems.includes(item.id));
    setDeselectedItems(deselectedItems);

    const categories = [...new Set(deselectedItems.map(item => item.categories).flat(1))].filter(c => c);
    setCategories(categories);
  }, [items, selectedItems]);

  useEffect(() => {
    const itemsInCategory = deselectedItems.filter(item => (
      !selectedCategory ||
      item.categories?.includes(selectedCategory)
    ));
    if (selectedCategory && !itemsInCategory.length) {
      selectCategory(undefined);
      return;
    }

    const listedItems = [] as (TGroupProps | TItemProps)[];
    itemsInCategory.forEach(item => {
      if (!(item.groups?.length)) {
        listedItems.push(item);
        return;
      }

      for (const groupName of item.groups) {
        const group = (listedItems as TGroupProps[]).find(({ title }) => title === groupName);
        if (!group) {
          listedItems.push({
            title: groupName,
            items: [item]
          });
          continue;
        }

        group.items.push(item);
      }
    });

    setListedItems(listedItems);
  }, [deselectedItems, selectedCategory]);

  const setSearchTextTimeout = useRef<NodeJS.Timeout>();
  const setSearchTextWithDelay = useCallback((text: string, delay = 0) => {
    if (setSearchTextTimeout.current) clearTimeout(setSearchTextTimeout.current);

    setUpdating(true);
    setSearchTextTimeout.current = setTimeout(() => {
      setSearchTextTimeout.current = undefined;
      setSearchText(text);
    }, delay);
  }, []);

  return [listedItems, categories, updating, error, selectedCategory, selectCategory, setSearchTextWithDelay, addItem];
};