export default {
  desktop: {
    large: 1280,
    small: 1024
  },
  tablet: {
    landscape: 991,
    portrait: 769
  },
  phone: {
    landscape: 641,
    portrait: 321
  },
  isDesktop(): boolean {
    return window.innerWidth >= this.desktop.small;
  },
  isTabletLandscapeMin(): boolean {
    return window.innerWidth >= this.tablet.landscape;
  },
  isTabletLandscapeMax(): boolean {
    return window.innerWidth < this.tablet.landscape;
  },
  isMobile(): boolean {
    return window.innerWidth < this.tablet.portrait;
  }
};