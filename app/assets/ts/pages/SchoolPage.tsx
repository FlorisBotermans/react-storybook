import React, { FC } from 'react';

import PageHeader, { TPageHeaderProps } from './header/PageHeader';

import SchoolSection, { TSchoolSectionProps } from '../components/SchoolSection/SchoolSection';

import CookieNotification, { TCookieNotificationProps } from '../components/CookieNotification';

type TSchoolPageProps = {
  pageHeaderProps: TPageHeaderProps;
  schoolSectionProps: TSchoolSectionProps;
  cookieNotificationProps: TCookieNotificationProps;
}

const SchoolPage: FC<TSchoolPageProps> = (props) => {
  const {
    pageHeaderProps,
    schoolSectionProps,
    cookieNotificationProps
  } = props;

  return (
    <>
      <PageHeader {...pageHeaderProps} />
      <SchoolSection {...schoolSectionProps} />
      <CookieNotification {...cookieNotificationProps} />
    </>
  );
};

export default SchoolPage;