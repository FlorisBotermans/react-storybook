import PageTransitions from './PageTransitions';

declare global {
  interface globalThis {
    pageTransitions: PageTransitions;
  }
}

globalThis.pageTransitions = new PageTransitions();