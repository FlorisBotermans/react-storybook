import { useRef, useState } from 'react';
import breakpoints from '../../utils/breakpoints';
import { useIsomorphicLayoutEffect } from '../../utils/serverSide/rendering';

export const useAccountMenu = (): [React.MutableRefObject<HTMLElement>, boolean, React.Dispatch<React.SetStateAction<boolean>>, React.MouseEventHandler<HTMLButtonElement>] => {
  const accountRef = useRef<HTMLElement>();

  const [accountMenuVisible, setAccountMenuVisible] = useState(false);
  useIsomorphicLayoutEffect(() => {
    if (!accountMenuVisible) return;

    const handleClick = () => {
      if (breakpoints.isTabletLandscapeMax() || accountRef.current.contains(document.activeElement)) return;

      setAccountMenuVisible(false);
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [accountMenuVisible, accountRef.current]);

  const handleAccountClose = (e) => {
    setAccountMenuVisible(false);
    e.currentTarget.blur();
  };

  return [accountRef, accountMenuVisible, setAccountMenuVisible, handleAccountClose];
};

export const useNavigation = (): [React.LegacyRef<HTMLDivElement>, boolean, () => void, boolean, () => void] => {
  const [navigationVisible, setNavigationVisible] = useState(false);
  const toggleNavigation = () => {
    setSearchVisible(false);
    setNavigationVisible(!navigationVisible);
  };

  const searchRef = useRef<HTMLDivElement>();
  const [searchVisible, setSearchVisible] = useState(false);
  const toggleSearch = () => {
    setNavigationVisible(false);
    setSearchVisible(!searchVisible);
    if (!searchRef.current || !breakpoints.isTabletLandscapeMax()) return;

    // Wait for render pass
    setTimeout(() => {
      searchRef.current.querySelector('input').focus();
    }, 100);
  };

  const [isMobile, setIsMobile] = useState(breakpoints.isTabletLandscapeMax());
  useIsomorphicLayoutEffect(() => {
    const handleResize = () => setIsMobile(breakpoints.isTabletLandscapeMax());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const lastScrollY = useRef(0);
  useIsomorphicLayoutEffect(() => {
    setSearchVisible(isMobile ? false : window.scrollY < 45);
    setNavigationVisible(false);
    if (isMobile) return;

    const handleScroll = () => {
      setSearchVisible(window.scrollY < 45 || lastScrollY.current >= window.scrollY);
      lastScrollY.current = window.scrollY;
    };
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  return [searchRef, searchVisible, toggleSearch, navigationVisible, toggleNavigation];
};