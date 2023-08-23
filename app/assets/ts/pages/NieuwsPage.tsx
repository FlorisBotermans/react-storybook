import React, { FC } from 'react';

import PageHeader, { TPageHeaderProps } from './header/PageHeader';

import ContentSection, { TContentSectionProps } from '../components/ContentSection';

import AccordionSection from '../components/AccordionSection/AccordionSection';
import { TAccordionSectionProps } from '../components/AccordionSection/types';

import CookieNotification, { TCookieNotificationProps } from '../components/CookieNotification';

type TNieuwsPageProps = {
  pageHeaderProps: TPageHeaderProps;
  contentSectionProps: TContentSectionProps;
  accordionSectionProps: TAccordionSectionProps;
  cookieNotificationProps: TCookieNotificationProps;
}

const NieuwsPage: FC<TNieuwsPageProps> = (props) => {
  const {
    pageHeaderProps,
    contentSectionProps,
    accordionSectionProps,
    cookieNotificationProps
  } = props;

  return (
    <>
      <PageHeader {...pageHeaderProps} />
      <ContentSection {...contentSectionProps} />
      <AccordionSection {...accordionSectionProps} />
      <CookieNotification {...cookieNotificationProps} />
    </>
  );
};

export default NieuwsPage;