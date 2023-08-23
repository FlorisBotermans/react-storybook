import React, { FC } from 'react';
import Calendar from './Calendar';
import { purifyInnerHTML } from '../../utils/domPurify';
import { TCalendarSectionProps } from './typings';
import Section, { LogoBackground, LogoPosition } from '../Containers/Section';
import ContentSectionContainer from '../Containers/ContentSectionContainer';

const CalendarSection: FC<TCalendarSectionProps> = ({
  id,
  title,
  intro,
  backwardsBtnText,
  forwardsBtnText,
  interval,
  start,
  end,
  events,
  groups,
  collections
}) => (
  <>
    {(title || intro) && (
      <ContentSectionContainer
        id={id}
        className="calendar-section calendar-section--content"
      >
        {title && (
          <h3>{title}</h3>
        )}
        {intro && (
          <div dangerouslySetInnerHTML={purifyInnerHTML(intro)} />
        )}
      </ContentSectionContainer>
    )}
    <Section
      id={(!title && !intro) ? id : null}
      className="calendar-section calendar-section--calendar"
      logo={{
        position: LogoPosition.Center,
        background: LogoBackground.White
      }}
      preventSwipeNavigation={true}
    >
      <Calendar
        interval={interval}
        start={start}
        end={end}
        events={events}
        groups={groups}
        collections={collections}
        backwardsBtnText={backwardsBtnText}
        forwardsBtnText={forwardsBtnText}
      />
    </Section>
  </>
);

export default CalendarSection;