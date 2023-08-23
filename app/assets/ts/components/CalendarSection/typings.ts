export type TCalendarSectionProps = TCalendarProps & {
  id?: string;
  title: string;
  intro: string;
};

export type TCalendarProps = {
  backwardsBtnText: string;
  forwardsBtnText: string;
  interval?: TInterval;
  start?: Date;
  end?: Date;
  events: TEvent[];
  groups: TGroup[];
  collections: TCollection[];
};

export type TCollection = {
  id: string;
  title?: string;
};

export type TGroup = {
  id: string;
  title?: string;
  collectionId?: string;
};

export type TEvent = {
  start?: Date;
  end?: Date;
  title?: string;
  description?: string;
  url?: string;
  groupId?: string;
  colour?: number;
  collectionId?: string;
};

export type TCalendarState = {
  eventLanesGroupCollection: TEventLanesGroupCollection[];
  timeline: Date[];
};

export type TEventLanesGroup = {
  id: string;
  title?: string;
  lanes: TEvent[][];
};

export type TEventLanesGroupCollection = {
  id: string;
  title?: string;
  groups: TEventLanesGroup[];
}

export type TInterval = {
  minutes: number;
  width: number;
  lineWidth: number;
};

export type TCollectionProps = TCollection & {
  onHeightChange: (groupId: string, height: number) => void;
};

export type TGroupProps = TGroup & {
  onHeightChange: (groupId: string, height: number) => void;
};

export type TEventsProps = {
  groupId: string;
  title?: string;
  lanes: TEvent[][];
  interval: TInterval;
  timeline: Date[];
  onHeightChange: (groupId: string, height: number) => void;
};

export type TEventProps = TEvent & {
  interval: TInterval;
  timeline: Date[];
};
