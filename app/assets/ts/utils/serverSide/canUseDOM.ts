const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement &&
  window.navigator &&
  window.navigator.userAgent
);

export default canUseDOM;