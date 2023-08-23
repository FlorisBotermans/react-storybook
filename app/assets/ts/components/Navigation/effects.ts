import Cookies from 'js-cookie';
import { MutableRefObject, useRef, useState } from 'react';
import breakpoints from '../../utils/breakpoints';
import { useIsomorphicLayoutEffect } from '../../utils/serverSide/rendering';

export const useScrollHints = (enabled = true): [MutableRefObject<HTMLDivElement>, boolean, MutableRefObject<HTMLDivElement>, boolean] => {
  const topRef = useRef<HTMLDivElement>();
  const bottomRef = useRef<HTMLDivElement>();
  const [topScrollHint, setTopScrollHint] = useState(false);
  const [bottomScrollHint, setBottomScrollHint] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (!enabled || !topRef.current || !bottomRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === topRef.current) {
          setTopScrollHint(!entry.isIntersecting);
        } else if (entry.target === bottomRef.current) {
          setBottomScrollHint(!entry.isIntersecting);
        }
      }
    }, { threshold: 0.0001 });
    observer.observe(topRef.current);
    observer.observe(bottomRef.current);
  }, []);

  return [topRef, topScrollHint, bottomRef, bottomScrollHint];
};

export const useItemFocus = (initial = false, hasItems: boolean, itemRef: MutableRefObject<HTMLLIElement>, arrowRef: MutableRefObject<HTMLSpanElement>): [boolean, (boolean) => void, { [key: string]: React.FocusEventHandler<HTMLLIElement> }, { [key: string]: React.MouseEventHandler<HTMLSpanElement> }] => {
  const [focused, setFocused] = useState(initial);

  const handleItemFocus = () => {
    if (breakpoints.isTabletLandscapeMax()) return;
    setFocused(true);
  };

  const handleItemBlur = async () => {
    if (breakpoints.isTabletLandscapeMax()) return;

    await new Promise(resolve => setTimeout(resolve, 1));
    if (itemRef.current.contains(document.activeElement)) return;

    setFocused(false);
  };

  const handleLinkClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    const arrow = arrowRef.current;
    if (!arrow || !breakpoints.isTabletLandscapeMax()) return;

    const isArrow = arrow === e.target || arrow.contains(e.target as HTMLElement);
    if (!isArrow) return;

    e.preventDefault();
    setFocused(true);
  };

  useIsomorphicLayoutEffect(() => {
    if (!focused) return;

    const handlePageBlur = () => {
      if (breakpoints.isTabletLandscapeMax()) return;

      setFocused(false);
      (document.activeElement as HTMLElement).blur();
    };

    const handlePageMouseleave = (e) => {
      if (breakpoints.isTabletLandscapeMax() || e.toElement) return;

      setFocused(false);
    };

    window.addEventListener('blur', handlePageBlur);
    document.addEventListener('mouseleave', handlePageMouseleave);
    return () => {
      window.removeEventListener('blur', handlePageBlur);
      document.removeEventListener('mouseleave', handlePageMouseleave);
    };
  });

  const itemHandlers = hasItems
    ? {
        onMouseEnter: handleItemFocus,
        onFocus: handleItemFocus,
        onMouseLeave: handleItemBlur,
        onBlur: handleItemBlur
      }
    : {};
  const linkHandlers = hasItems
    ? {
        onClick: handleLinkClick
      }
    : {};
  return [focused, setFocused, itemHandlers, linkHandlers];
};

export const useSectionTop = (topOffset: number, focused: boolean, parentItemRef: MutableRefObject<HTMLElement>, sectionRef: MutableRefObject<HTMLElement>, sectionContainerRef: MutableRefObject<HTMLElement>): [number] => {
  const [top, setTop] = useState<number>();
  useIsomorphicLayoutEffect(() => {
    if (!sectionRef?.current || !sectionContainerRef?.current || !parentItemRef?.current || !focused) return;

    const parentTop = parentItemRef.current.getBoundingClientRect().y;
    const parentTopMargin = 10;

    const sectionTop = sectionRef.current.getBoundingClientRect().y;
    const sectionContainerRect = sectionContainerRef.current.getBoundingClientRect();
    const topMargin = sectionContainerRect.y - sectionTop;
    const height = sectionContainerRect.height;
    const topMax = window.innerHeight - topOffset - height - parentTopMargin - topMargin;

    const top = parentTop - parentTopMargin - topMargin - topOffset;
    const topClampedToWindow = Math.max(0, Math.min(top, topMax));
    setTop(topClampedToWindow);
  }, [setTop, topOffset, focused, parentItemRef?.current, sectionRef.current, sectionContainerRef.current]);

  return [top];
};

export const useNavigation = (openProp): [boolean, () => void] => {
  const [sticky, setSticky] = useState(openProp || Cookies.get('navigation-sticky') === 'true');
  const toggle = () => setSticky(!sticky);

  return [sticky, toggle];
};