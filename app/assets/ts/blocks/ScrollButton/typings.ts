import { MutableRefObject } from 'react';
import { Scrollbar } from 'smooth-scrollbar/interfaces';

export type TScrollButtonProps = {
  scrollbarState: MutableRefObject<Scrollbar>;
  options?: {
    position: ScrollButtonPosition;
    className?: string;
    direction?: ScrollButtonDirection;
  }
};

export enum ScrollButtonPosition {
  OneThird = 'one-third',
  Right = 'right'
}

export enum ScrollButtonDirection {
  Left = -1,
  Right = 1
}