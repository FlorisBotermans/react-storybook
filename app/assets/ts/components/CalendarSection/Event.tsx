import classNames from 'classnames';
import React, { FC } from 'react';
import { TEventProps } from './typings';
import { differenceInMinutes, format } from 'date-fns';
import { nl, enGB } from 'date-fns/locale';
import { purifyInnerHTML } from '../../utils/domPurify';
import canUseDOM from '../../utils/serverSide/canUseDOM';
import Tooltip from '../../blocks/Tooltip';
import { getOptionalAnchorProps } from '../../utils/anchorHelper';
import { getLocale } from '../../utils/locale';

const locale = { nl, en: enGB }[getLocale().substr(0, 2)];
const formatHHmm = {
  nl: 'HH.mm',
  en: 'HH:mm'
}[getLocale().substr(0, 2)];

const decodeHtml = (html: string): string => {
  if (!canUseDOM) return html;

  const textarea = document.createElement('textarea');
  textarea.innerHTML = html;
  return textarea.value;
};

const Event: FC<TEventProps> = ({
  start,
  end,
  title,
  description,
  url,
  interval,
  timeline,
  colour
}) => {
  const time = `${format(start, formatHHmm, { locale })} - ${format(end, formatHHmm, { locale })}`;
  const width = Math.round(
    (start && end)
      ? (differenceInMinutes(end, start) / interval.minutes) * interval.width
      : (timeline.length - 1) * interval.width
  ) - interval.lineWidth;
  const marginLeft = Math.round(
    (start && end)
      ? (differenceInMinutes(start, timeline[0]) / interval.minutes) * interval.width
      : 0
  );
  const marginRight = -(marginLeft + width);
  let colourClass = 'blue';

  switch (colour) {
    case 0:
      colourClass = 'blue';
      break;
    case 1:
      colourClass = 'red';
      break;
    case 2:
      colourClass = 'white';
      break;
    default:
      colourClass = 'blue';
  }

  const contentAttributes = {
    className: classNames(`calendar__event-content calendar__event-${colourClass}`, {
      'calendar__event-content--link': url || description
    }),
    title: decodeHtml([title, time].filter(t => t).join('\n'))
  };

  const Title = () => (
    <div
      className="calendar__event-title"
      dangerouslySetInnerHTML={purifyInnerHTML(title || time)} />
  );

  return (
    <div
      className="calendar__event"
      style={{ marginLeft, width, marginRight }}
    >
      {url
        ? <a {...contentAttributes} href={url} {...getOptionalAnchorProps(url)}><Title/></a>
        : description
          ? <div {...contentAttributes}><Tooltip showIcon={false} text={description}><Title /></Tooltip></div>
          : <button {...contentAttributes}><Title /></button>
      }
    </div>
  );
};

export default Event;
