import canUseDOM from './serverSide/canUseDOM';

export default class MasterSlaveScroller {
  public enabled = true;
  private masterSelector: string;
  private slaveSelector: string;

  private _master: HTMLElement;
  private get master(): HTMLElement {
    if (!this._master || !this._master.isConnected) {
      this._master = document.querySelector(this.masterSelector);
    }
    return this._master;
  }

  private _slave: HTMLElement;
  private get slave(): HTMLElement {
    if (!this._slave || !this._slave.isConnected) {
      this._slave = document.querySelector(this.slaveSelector);
    }
    return this._slave;
  }

  constructor(masterSelector: string, slaveSelector: string) {
    this.masterSelector = masterSelector;
    this.slaveSelector = slaveSelector;
    if (!canUseDOM) return;

    this.setSlaveScrollTop();

    window.addEventListener('scroll', this.setSlaveScrollTop);
    window.addEventListener('resize', this.setSlaveScrollTop);
  }

  setSlaveScrollTop = (): void => {
    if (!this.enabled) {
      return;
    }

    const master = this.master;
    const slave = this.slave;
    if (!master || !slave) {
      throw new Error(`MasterSlaveScroller has lost its master and/or slave element. 
If you wanted to remove the MasterSlaveScroller please use the dispose() method first to prevent memory leaks.`);
    }

    const masterHeight = window.innerHeight;
    const masterRect = master.getBoundingClientRect();
    const masterScrollHeight = masterRect.height - masterHeight;
    const masterScrollTop = -masterRect.top;
    const masterScrollTopPercentage = masterScrollTop / masterScrollHeight;
    const slaveHeight = window.innerHeight;
    const slaveScrollHeight = slave.scrollHeight - slaveHeight;
    const slaveScrollTop = slaveScrollHeight * masterScrollTopPercentage;

    slave.scrollTop = slaveScrollTop;
  };

  dispose(): void {
    window.removeEventListener('scroll', this.setSlaveScrollTop);
    window.removeEventListener('resize', this.setSlaveScrollTop);
  }
}
