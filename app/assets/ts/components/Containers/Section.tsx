import React, { FC, useCallback, useState } from 'react';
import { useIsomorphicLayoutEffect } from '../../utils/serverSide/rendering';

export enum LogoPosition {
  OneThird = 'one-third',
  TwoThird = 'two-third',
  Center = 'center'
}
export enum LogoBackground {
  White = 'white',
  Accent1Tint1 = 'accent1-tint1',
  Accent1Tint3 = 'accent1-tint3'
}
export interface LogoState {
  position: LogoPosition;
  background: LogoBackground;
}

interface SectionViewModel {
  id?: string;
  className?: string;
  logo?: LogoState;
  preventSwipeNavigation?: boolean;
}

const Section: FC<SectionViewModel> = ({ children, id, logo, className, preventSwipeNavigation = false }) => {
  const [section, setSection] = useState<HTMLElement>();
  const sectionRef = useCallback((section: HTMLDivElement) => setSection(section), []);

  // prevent swipe to navigate back gesture
  useIsomorphicLayoutEffect(() => {
    if (!preventSwipeNavigation || !section) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch?.pageX > 10 && touch?.pageX < window.innerWidth - 10) return;

      e.preventDefault();
    };
    section.addEventListener('touchstart', handleTouchStart);

    return () => {
      section.removeEventListener('touchstart', handleTouchStart);
    };
  }, [preventSwipeNavigation, section]);

  return (
    <section
      ref={sectionRef}
      id={id}
      data-logo-position={logo?.position}
      data-logo-background={logo?.background}
      className={className}>
      {children}
    </section>
  );
};

export default Section;
