const fixSafariScrollPositionOnPageload = (): void => {
  if (window.location.hash === '') return;

  const isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1;
  if (!isSafari) return;

  const hash = window.location.hash;
  window.location.hash = '';
  window.location.hash = hash;
};

export default fixSafariScrollPositionOnPageload;