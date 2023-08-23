import { useMemo } from 'react';
import { createURL } from '../../utils/url';

export const useDeleteUrlToUnfollowUrlSelector = (deleteUrl = '', id: unknown = ''): string => useMemo(() => {
  const url = createURL(deleteUrl);
  url.searchParams.set('id', id as string);
  return url.toString();
}, [deleteUrl, id]);