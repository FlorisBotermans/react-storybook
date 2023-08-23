
import React, { FC, Fragment, useRef } from 'react';
import { TNavigationSectionProps } from './typings';
import NavigationItem from './NavigationItem';
import classNames from 'classnames';
import { useSectionTop, useScrollHints } from './effects';
import { useNavigationItemsToListsSelector } from './selectors';
import CrossIcon from '../../../icons/cross.svg';

const NavigationSection: FC<TNavigationSectionProps> = ({ topOffset = 0, focused = true, onClose, scrollable = false, parentItemRef, items }) => {
  const lists = useNavigationItemsToListsSelector(items);
  const [topRef, topScrollHint, bottomRef, bottomScrollHint] = useScrollHints(scrollable);

  const sectionRef = useRef<HTMLElement>();
  const sectionContainerRef = useRef<HTMLDivElement>();
  const [top] = useSectionTop(topOffset, focused, parentItemRef, sectionRef, sectionContainerRef);

  return (
    <section
      ref={sectionRef}
      className={classNames('navigation__section', { 'navigation__section--focused': focused })}
      style={{ '--top': `${top || 0}px` } as React.CSSProperties}
    >
      <button className="navigation__close-btn" tabIndex={-1} onClick={onClose}><CrossIcon /></button>
      <div
        ref={sectionContainerRef}
        className={classNames(
          'navigation__section-container',
          { 'navigation__section-container--top-hint': topScrollHint },
          { 'navigation__section-container--bottom-hint': bottomScrollHint }
        )}
      >
        <div className={scrollable ? 'navigation__scroller' : ''}>
          <div ref={topRef} className="navigation__scroll-top-detection"></div>
          {lists.map(({ header, items, separator }, i) => (
            <Fragment key={i}>
              <div className="navigation__list-container">
                {header && (
                  <h2 className="navigation__header">{header.text}</h2>
                )}
                {items?.length > 0 && (
                  <ul className="navigation__list">
                    {items.map((item, i) => (
                      <NavigationItem key={i} {...item} topOffset={top} />
                    ))}
                  </ul>
                )}
              </div>
              {separator && (
                <hr className="navigation__separator" />
              )}
            </Fragment>
          ))}
          <div ref={bottomRef} className="navigation__scroll-bottom-detection"></div>
        </div>
      </div>
    </section>
  );
};

export default NavigationSection;