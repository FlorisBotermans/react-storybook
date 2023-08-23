import React, { FC } from 'react';

import PageHeader, { TPageHeaderProps } from './header/PageHeader';

import OverviewSection, { TOverviewSectionProps } from '../components/OverviewSection';

import CookieNotification, { TCookieNotificationProps } from '../components/CookieNotification';

type TOverzichtBlokkenPageProps = {
  pageHeaderProps: TPageHeaderProps;
  overviewSectionProps: TOverviewSectionProps;
  cookieNotificationProps: TCookieNotificationProps;
}

const OverzichtBlokkenPage: FC<TOverzichtBlokkenPageProps> = (props) => {
  const {
    pageHeaderProps,
    overviewSectionProps,
    cookieNotificationProps
  } = props;

  return (
    <>
      <PageHeader {...pageHeaderProps} />
      <OverviewSection {...overviewSectionProps} />
      <CookieNotification {...cookieNotificationProps} />
    </>
  );
};

export default OverzichtBlokkenPage;