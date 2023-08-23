import { useLayoutEffect, useEffect } from 'react';
import canUseDOM from './canUseDOM';

export const useIsomorphicLayoutEffect = (canUseDOM) ? useLayoutEffect : useEffect;

export const clientSideOnly = (callback: () => void): void => {
  if (!canUseDOM) return;

  callback();
};