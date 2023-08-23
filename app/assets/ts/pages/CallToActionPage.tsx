import React, { FC } from 'react';

import PageHeader, { TPageHeaderProps } from './header/PageHeader';

import CTASection from '../components/CTASection';
import { TCTASectionProps } from '../components/CTASection/typings';

import CookieNotification, { TCookieNotificationProps } from '../components/CookieNotification';

type TCallToActionPageProps = {
  pageHeaderProps: TPageHeaderProps;
  callToActionSectionProps: TCTASectionProps;
  cookieNotificationProps: TCookieNotificationProps;
}

const CallToActionPage: FC<TCallToActionPageProps> = (props) => {
  const {
    pageHeaderProps,
    callToActionSectionProps,
    cookieNotificationProps
  } = props;

  return (
    <>
      <PageHeader {...pageHeaderProps} />
      <CTASection {...callToActionSectionProps} />
      <CookieNotification {...cookieNotificationProps} />
    </>
  );
};

export default CallToActionPage;