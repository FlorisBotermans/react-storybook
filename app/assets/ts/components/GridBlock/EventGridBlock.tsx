import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import GridBlock from './GridBlock';
import moment from 'moment';

moment.locale('nl');

type TProps = {
  type: string;
  title: string;
  subTitle: string;
  imageUrls: string[];
  linkUrl: string;
  startDate: Date;
  endDate?: Date;
  className?: string;
}

const renderShortDate = (date: Date): string => {
  return (date) ? moment(date).format('DD/MM') : null;
};

const shouldRenderEndDate = (start: Date, end: Date = null): boolean => {
  if (!end) return false;
  return end && !moment(start).isSame(moment(end), 'day');
};

const EventGridBlock: FunctionComponent<TProps> = (props) => {
  const {
    startDate = null,
    endDate = null,
    className = null
  } = props;

  const eventGridClass = classNames('grid-block--with-date', className, {
    'grid-block--with-end-date': shouldRenderEndDate(startDate, endDate)
  });

  return (
    <GridBlock {...props} className={eventGridClass}>
      <span className="grid-block__content-date">
        <span>{renderShortDate(startDate)}</span>
        {shouldRenderEndDate(startDate, endDate) && <span>{renderShortDate(endDate)}</span>}
      </span>
    </GridBlock>
  );
};

export type TEventGridBlockProps = TProps;
export default EventGridBlock;
