import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';

import slugify from '../utils/slugify';
import { supportScrollBehavior } from '../utils/detect';
import ArrowIcon from '../../icons/arrow-scalable.svg';
import { useIsomorphicLayoutEffect } from '../utils/serverSide/rendering';
import canUseDOM from '../utils/serverSide/canUseDOM';

interface AnchorMenuViewModel {
  anchors: string[];
}

function getAnchors(): HTMLDivElement[] {
  return [...document.querySelectorAll<HTMLDivElement>('.anchor[data-anchor]')];
}

function observeAnchors(observer: IntersectionObserver): void {
  const anchors = getAnchors();
  anchors.forEach(element => {
    observer.observe(element);
  });
}

function createObserver(callback: IntersectionObserverCallback): IntersectionObserver {
  const observer = new IntersectionObserver(callback, {
    root: null,
    rootMargin: '0px 0px -93px 0px',
    threshold: [0.5]
  });

  // IE11 polyfill options
  observer['POLL_INTERVAL'] = 100; // eslint-disable-line dot-notation
  observer['USE_MUTATION_OBSERVER'] = false; // eslint-disable-line dot-notation

  observeAnchors(observer);
  return observer;
}

export default function AnchorMenu({ anchors = [] }: AnchorMenuViewModel): JSX.Element {
  const [activeAnchor, setActiveAnchor] = useState<string>(anchors.length > 0 ? anchors[0] : null);
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    document.body.classList.add('anchor-menu-spacer');
    return (): void => document.body.classList.remove('anchor-menu-spacer');
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!canUseDOM) return;

    function handleIntersect(entries: IntersectionObserverEntry[]): void {
      const visibleEntry = entries
        .filter(entry => (entry.target as HTMLDivElement).dataset.anchor)
        .find(entry => entry.intersectionRatio >= 0.5); // IE11: intersectionRatio because isIntersecting is always true

      // Anchor comes into viewport
      if (visibleEntry) {
        const anchorName = visibleEntry.target.getAttribute('data-anchor');
        setActiveAnchor(anchorName);

      // Anchor dissappeared from viewport
      } else {
        const entryiesBelowHalfViewport = entries
          .filter(entry => entry.intersectionRatio < 0.5 && entry.boundingClientRect.top > 0)
          .sort((a, b) => {
            const aTop = a.boundingClientRect.top;
            const bTop = b.boundingClientRect.top;
            return (aTop === bTop) ? 0 : ((aTop > bTop) ? 1 : -1);
          });
        if (!entryiesBelowHalfViewport.length) return;

        const anchor = entryiesBelowHalfViewport[0].target as HTMLDivElement;
        const anchors = getAnchors();
        const anchorIndex = anchors.indexOf(anchor);
        const previousAnchor = (anchorIndex === 0) ? anchor : anchors[anchorIndex - 1];
        const previousAnchorName = previousAnchor.getAttribute('data-anchor');
        setActiveAnchor(previousAnchorName);
      }
    }

    // Using setTimeout for the DOM to be ready so that we can retrieve a NodeList of anchors created in another component
    if (observer.current) observer.current.disconnect();
    setTimeout(() => {
      observer.current = createObserver(handleIntersect);
    }, 1);
  }, [anchors]);

  useEffect(() => {
    const anchorElement = document.querySelector(`[data-anchor="${activeAnchor}"]`) as HTMLElement;
    if (!anchorElement) return;
    const firstElement = anchors[0] === activeAnchor;
    const scrollLeftPosition = firstElement ? 0 : anchorElement.parentElement.offsetLeft;
    document.querySelector('.anchor-menu').scrollLeft = scrollLeftPosition;
  }, [activeAnchor, anchors]);

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, anchor: string): void {
    event.preventDefault();

    // Stop detecting anchors when scrolling to the page
    if (observer.current) observer.current.disconnect();
    setActiveAnchor(anchor);

    // Remove focus on anchor tag, so that focus styling is removed
    const link = event.currentTarget;
    link.blur();

    // Scroll the selected anchor
    const anchorId = slugify(anchor);
    const element = document.getElementById(anchorId);
    if (supportScrollBehavior()) {
      window.scroll({
        behavior: 'smooth',
        top: element.offsetTop
      });
    } else {
      window.scrollTo(0, element.offsetTop);
    }

    // Start detecting anchors again after scroll animation is finished
    setTimeout(() => {
      if (observer.current) observeAnchors(observer.current);
    }, 1000);
  }

  function renderLink(anchor: string): JSX.Element {
    const linkClass = classNames({
      'anchor-menu__link': true,
      'anchor-menu__link--active': activeAnchor === anchor
    });
    if (!anchor) return null;
    return (
      <a href={`#${slugify(anchor)}`} data-anchor={anchor} className={linkClass} onClick={(event): void => handleClick(event, anchor)}>
        {anchor} <ArrowIcon className="anchor-menu__link-icon" />
      </a>
    );
  }

  return (
    <nav className="anchor-menu">
      <div className="anchor-menu__container">
        <div className="container container--center-wide">
          <ul className="anchor-menu__list">
            {anchors.map(element => (
              <li key={element} className="anchor-menu__list-item">
                {renderLink(element)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export type TAnchorMenuProps = AnchorMenuViewModel;