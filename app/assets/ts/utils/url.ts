export const createURL = (url = '') => {
  if (!url.includes('://')) {
    url = `${location.origin}${url}`.replaceAll('//', '/');
  }
  return new URL(url);
};
