import HydrationQueueManager from './HydrationQueueManager';
import canUseDOM from '../../utils/serverSide/canUseDOM';
import fixSafariScrollPositionOnPageload from '../fixSafariScrollPositionOnPageload';

export default class PageTransitions {
  hydrationQueueManager = new HydrationQueueManager();

  constructor() {
    if (!canUseDOM) return;

    this.initScroll();
  }

  private initScroll(): void {
    fixSafariScrollPositionOnPageload();
  }
}