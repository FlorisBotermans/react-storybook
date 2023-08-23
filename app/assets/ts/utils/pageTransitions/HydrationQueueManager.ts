import { LoadableComponent } from '@loadable/component';
import ReactDOM from 'react-dom';
import asyncRequestIdleCallback from '../../utils/asyncRequestIdleCallback';
import canUseDOM from '../../utils/serverSide/canUseDOM';
import LazySizes from '../../blocks/LazySizes';

declare global {
  interface globalThis {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    hydrationQueue: HydrationQueueItem[];
  }
}

globalThis.hydrationQueue = globalThis.hydrationQueue || [];

type HydrationQueueItem = {
  selector: string;
  componentName: string;
  initComponent: () => React.DOMElement<React.DOMAttributes<Element>, Element>;
  component?: React.DOMElement<React.DOMAttributes<Element>, Element>;
}

export default class HydrationQueueManager {
  private renderedComponents: string[] = [];
  public onAfterRender: () => void;

  constructor() {
    if (!canUseDOM) return;

    // Initial page load
    if (this.loadIfReady()) return;
    document.addEventListener('readystatechange', this.loadIfReady, false);
  }

  loadIfReady = (): boolean => {
    if (document.readyState !== 'complete') return;

    document.removeEventListener('readystatechange', this.loadIfReady);
    this.hydrate();
    globalThis.hydrationQueue.push = this.pushFutureComponents; // Hydrate components after pageload
    return true;
  };

  pushFutureComponents = (item: HydrationQueueItem): number => {
    this.hydrateComponent(item);
    return 0;
  };

  async hydrate(hydrate?: boolean): Promise<void> {
    // Step 1: Remove duplicate render/hydration scripts from the hydrationQueue
    globalThis.hydrationQueue = globalThis.hydrationQueue.filter((item) => {
      if (!item.initComponent) return true;
      if (globalThis.hydrationQueue.find(existingItem => (
        existingItem.component &&
        existingItem.selector === item.selector // Duplicate selectors only need to be hydrated once
      ))) {
        console.warn(`Duplicate ${item.componentName} component in ${item.selector} - Hydration already initialized`);
        return false;
      }
      return true;
    });

    for (const item of globalThis.hydrationQueue) {
      await this.hydrateComponent(item, hydrate);
      this.renderedComponents.push(item.selector);
    }

    LazySizes.load();
  }

  async hydrateComponent(item: HydrationQueueItem, hydrate?: boolean): Promise<void> {
    if (this.renderedComponents.includes(item.selector)) {
      // console.log(item.selector, 'Already rendered on this page');
      return;
    }

    const root = document.querySelector(item.selector);
    if (!root) {
      console.warn(`${item.componentName} component in ${item.selector} is not in the current page`);
      return;
    }

    const isEmpty = !(root.innerHTML.trim());
    if (hydrate !== undefined && hydrate === isEmpty) {
      // console.log(item.selector, (hydrate) ? 'Cannot hydrate in an empty element' : 'Cannot render in an element with existing html');
      return;
    }

    // Step 2: Preload component script
    if (item.initComponent) {
      // Reduce input feedback blocking by using requestIdleCallback
      await asyncRequestIdleCallback(async () => {
        try {
          if (!item.componentName) {
            throw new Error('Missing componentName from HydrationQueue item');
          }
          const component = item.componentName
            .split('.')
            .reduce((parent, name) => parent[name], globalThis) as LoadableComponent<React.ReactNode>;

          // Some components are already included in the main.js
          if (component.load) {
            await component.load();
          }

          // Already loaded by another promise in the mean time
          if (!item.initComponent) {
            // console.log('preloaded component already loaded', item, component);
            return;
          }
          item.component = item.initComponent();
          delete item.initComponent;
        } catch (error) {
          console.error('Error while preloading component:', error, item);
        }
      });
    }

    // Step 3: Render/hydrate component
    // Render in an empty element | Hydrate in an element with existing html
    const renderMethod = (isEmpty) ? ReactDOM.render : ReactDOM.hydrate;
    try {
      renderMethod(
        item.component,
        root
      );
    } catch (ex) {
      console.error(`Failed to hydrate ${item.componentName} component in ${item.selector}`, ex);
    }
  }
}