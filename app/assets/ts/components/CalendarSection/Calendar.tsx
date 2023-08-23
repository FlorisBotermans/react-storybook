import classNames from 'classnames';
import React, { FC, useCallback, useMemo, useRef, useState } from 'react';
import { TCalendarProps, TGroup, TEvent, TEventLanesGroupCollection, TCalendarState, TCollection } from './typings';
import { add, format, startOfHour } from 'date-fns';
import { nl, enGB } from 'date-fns/locale';
import AnchorIcon from '../../../icons/anchor.svg';
import Events from './Events';
import Group from './Group';
import Collection from './Collection';
import { getLocale } from '../../utils/locale';

const locale = { nl, en: enGB }[getLocale().substr(0, 2)];
const formatHHmm = {
  nl: 'HH.mm',
  en: 'HH:mm'
}[getLocale().substr(0, 2)];

const getRange = (events: TEvent[], start?: Date, end?: Date) => {
  const eventsStart = events
    .map(({ start }) => start)
    .filter(start => start)
    .sort((a, b) => (a > b) ? 1 : (a < b ? -1 : 0))
    .find(start => start);
  start = (start && start < eventsStart) ? start : eventsStart;
  const eventsEnd = events
    .map(({ end }) => end)
    .filter(end => end)
    .sort((a, b) => (a > b) ? 1 : (a < b ? -1 : 0))
    .find(end => end);
  end = (end && end > eventsEnd) ? end : eventsEnd;
  return {
    start,
    end
  };
};

const getTimeline = (minutes: number, start: Date, end: Date): Date[] => {
  let date = startOfHour(start);
  const timeline = [date];
  const stackoverflowLimit = 1000;
  for (let i = 0; date < end && i < stackoverflowLimit; i++) {
    date = add(date, {
      minutes
    });
    if (date <= start) {
      timeline[0] = date;
    } else {
      timeline.push(date);
    }
  }

  return timeline;
};

const mergeEvents = (
  collections: TCollection[],
  groups: TGroup[],
  events: TEvent[],
  start?: Date,
  end?: Date
): TEventLanesGroupCollection[] => {
  events = events
    .map(event => ({
      ...event,
      start: event.start || start,
      end: event.end || end
    }))
    .sort(({ start: a }, { start: b }) => (a > b) ? 1 : (a < b ? -1 : 0));

  // Merge events into groups
  const eventsGroups = groups.map(({ collectionId, id, title }) => ({
    collectionId,
    id,
    title,
    events: events.filter(({ groupId }) => groupId === id)
  }));

  const grouplessEvents = events.filter(({ groupId }) => !groups.some(group => group.id === groupId));
  if (grouplessEvents.length > 0) {
    grouplessEvents.forEach((grouplessEvent) => {
      const eventsGroup = eventsGroups.find(group => group.id === grouplessEvent.groupId && group.collectionId === grouplessEvent.collectionId);
      if (eventsGroup) {
        eventsGroup.events.push(grouplessEvent);
      } else {
        eventsGroups.push({
          collectionId: grouplessEvent.collectionId,
          id: grouplessEvent.groupId,
          title: '',
          events: [grouplessEvent]
        });
      }
    });
  }

  // Merge events groups into lanes groups
  const lanedGroups = eventsGroups.map(({ collectionId, id, title, events }) => {
    const lanes: TEvent[][] = [];
    events.forEach(event => {
      // Find free lane
      let laneIndex = lanes.findIndex(laneEvents =>
        !laneEvents.some(laneEvent => (
          event.start < laneEvent.end &&
          event.end > laneEvent.start
        ))
      );
      // Create new lane
      if (laneIndex === -1) {
        lanes.push([]);
        laneIndex = lanes.length - 1;
      }
      lanes[laneIndex].push(event);
    });
    return {
      collectionId,
      id,
      title,
      lanes
    };
  });

  // Map lanes groups into collections
  const groupsCollections = collections.map(({ id, title }) => ({
    id,
    title,
    groups: lanedGroups.filter(({ collectionId }) => collectionId === id)
  }));

  const collectionlessLanedGroups = lanedGroups.filter(({ collectionId }) => !collections.some(collection => collection.id === collectionId));
  if (collectionlessLanedGroups.length > 0) {
    groupsCollections.push({
      id: '',
      title: '',
      groups: collectionlessLanedGroups
    });
  }

  return groupsCollections;
};

const getState = (minutes: number, start?: Date, end?: Date, events: TEvent[] = [], groups: TGroup[] = [], collections: TCollection[] = []) => {
  const range = getRange(events, start, end);
  const timeline = getTimeline(minutes, range.start, range.end);
  const continuousEventRange = {
    start: start || range.start,
    end: end || range.end
  };
  const eventLanesGroupCollection = mergeEvents(collections, groups, events, continuousEventRange.start, continuousEventRange.end);
  return {
    eventLanesGroupCollection,
    timeline
  };
};

const scroll = (scroller: HTMLElement, intervalWidth: number, pages: number) => {
  if (!scroller) return;

  const scrollLeft = scroller.scrollLeft;
  const pageWidth = scroller.clientWidth;
  const round = Math.sign(pages) > 0 ? Math.floor : Math.ceil;
  const left = Math.min(
    scroller.scrollWidth - scroller.clientWidth,
    round((scrollLeft + (pageWidth * pages)) / intervalWidth) * intervalWidth
  );
  // IE11
  if (!scroller.scrollTo) {
    scroller.scrollLeft = left;
    return;
  }
  scroller.scrollTo({
    behavior: 'smooth',
    left
  });
};

const Calendar: FC<TCalendarProps> = ({
  backwardsBtnText = 'eerder',
  forwardsBtnText = 'later',
  interval = {
    minutes: 30,
    width: 100,
    lineWidth: 1
  },
  start,
  end,
  events,
  groups,
  collections
}) => {
  const {
    eventLanesGroupCollection,
    timeline
  } = useMemo<TCalendarState>(
    () => getState(interval?.minutes, start, end, events, groups, collections),
    [events, groups, collections, interval, start, end]
  );

  const [scroller, setScroller] = useState<HTMLDivElement>();
  const scrollerRef = useCallback((scroller: HTMLDivElement) => setScroller(scroller), []);

  // Synchronize the group title height with the items height
  const [heights, setHeights] = useState<{ [key: string]: { group?: number, items?: number } }>({});
  const handleHeightsChangedTimeout = useRef<NodeJS.Timeout>();
  const handleHeightsChange = useCallback(() => {
    if (handleHeightsChangedTimeout.current) return;
    handleHeightsChangedTimeout.current = setTimeout(() => {
      handleHeightsChangedTimeout.current = undefined;
      setHeights({ ...heights });
    }, 0);
  }, [heights]);
  const handleGroupHeightChange = useCallback((groupId: string, height: number) => {
    if (heights[groupId]?.group === height) return;
    heights[groupId] = {
      ...heights[groupId],
      group: height
    };
    handleHeightsChange();
  }, [handleHeightsChange, heights]);
  const handleItemsHeightChange = useCallback((groupId: string, height: number) => {
    if (heights[groupId]?.items === height) return;
    heights[groupId] = {
      ...heights[groupId],
      items: height
    };
    handleHeightsChange();
  }, [handleHeightsChange, heights]);

  return (
    <div className="calendar">
      <div className="calendar__navigation">
        <button className="calendar__navigation-btn" onClick={() => scroll(scroller, interval.width, -1)}>
          <AnchorIcon className="calendar__navigation-icon calendar__navigation-icon--backwards" />
          <span className="calendar__navigation-text">{backwardsBtnText}</span>
        </button>
        <button className="calendar__navigation-btn" onClick={() => scroll(scroller, interval.width, 1)}>
          <span className="calendar__navigation-text">{forwardsBtnText}</span>
          <AnchorIcon className="calendar__navigation-icon calendar__navigation-icon--forwards" />
        </button>
      </div>
      {/*
        The desktop group titles are not part of the calendar__overview-scroller
        because we want to support scrolling on IE11 without position: sticky;
        > This the reason we synchronize the calendar__group-info height with the calendar__events-group
        > But this decision makes it impossible to make the list vertically scrollable
      */}
      <div className="calendar__container">
        {eventLanesGroupCollection.some(collection => collection.groups.some(({ title }) => title)) && (
          <div className="calendar__collections">
            {eventLanesGroupCollection.map(({ id, title, groups }, ci) => (
              <React.Fragment key={`${id}-${ci}`}>
                {(ci !== 0 || title) &&
                  <Collection
                    id={`collection-${id}`}
                    title={title}
                    onHeightChange={handleGroupHeightChange}
                  />
                }
                {groups.map((group, gi) => (
                  <div
                    key={`${group.id}-${gi}`}
                    className="calendar__group-info-container"
                    style={{ minHeight: heights[group.id]?.items as number }}
                  >
                    <Group
                      {...group}
                      onHeightChange={handleGroupHeightChange}
                    />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        )}
        <div className="calendar__overview">
          <div className="calendar__overview-scroller" ref={scrollerRef}>
            <div className="calendar__overview-content" style={{ width: `${(timeline.length - 1) * interval.width - interval.lineWidth}px` }}>
              <div className="calendar__timeline">
                {timeline.map((date, i, dates) =>
                  (i === dates.length - 1) ? null : (
                    <div
                      key={`${i}-${date}`}
                      className={classNames('calendar__timeline-unit', {
                        'calendar__timeline-unit--minor': date.getMinutes() !== 0
                      })}
                      style={{ width: interval.width - (dates.length - 2 === i ? interval.lineWidth : 0) }}
                    >
                      <div className="calendar__timeline-date">
                        {format(date, formatHHmm, { locale })}
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className="calendar__events">
                <div className="calendar__events-timeline">
                  {timeline.map((date, i, dates) =>
                    (i === dates.length - 1) ? null : (
                      <div
                        key={`${i}-${date}`}
                        className={classNames('calendar__events-timeline-unit', {
                          'calendar__events-timeline-unit--minor': date.getMinutes() !== 0
                        })}
                        style={{ width: interval.width - (dates.length - 2 === i ? interval.lineWidth : 0) }}
                      />
                    )
                  )}
                </div>
                {eventLanesGroupCollection.map(({ id, title, groups }, index) => (
                  <React.Fragment key={id}>
                    {(index !== 0 || title) && (
                      <div
                        className="calendar__events-collection"
                        style={{ minHeight: heights[`collection-${id}`]?.group as number }}
                      >
                        <div className="calendar__events-collection-info">
                          <div className="calendar__events-collection-title">
                            {title}
                          </div>
                        </div>
                      </div>
                    )}
                    {groups.map(({
                      id,
                      title,
                      lanes
                    }, i) => (
                      <div
                        key={`${id}-${i}`}
                        className="calendar__events-group-container"
                        style={{ minHeight: heights[id]?.group as number }}
                      >
                        <Events
                          groupId={id}
                          title={title}
                          lanes={lanes}
                          interval={interval}
                          timeline={timeline}
                          onHeightChange={handleItemsHeightChange}
                        />
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
