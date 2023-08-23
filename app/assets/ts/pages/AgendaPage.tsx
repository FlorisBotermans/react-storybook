import React, { FC } from 'react';

import PageHeader, { TPageHeaderProps } from './header/PageHeader';

import AnchorSection, { TAnchorSectionProps } from '../components/AnchorSection';

import ContentSection, { TContentSectionProps } from '../components/ContentSection';

import AccordionSection from '../components/AccordionSection/AccordionSection';
import { TAccordionSectionProps } from '../components/AccordionSection/types';

import CookieNotification, { TCookieNotificationProps } from '../components/CookieNotification';

type TAgendaPageProps = {
  pageHeaderProps: TPageHeaderProps;
  anchorSectionProps: TAnchorSectionProps;
  contentSectionProps: TContentSectionProps;
  accordionSectionProps: TAccordionSectionProps;
  cookieNotificationProps: TCookieNotificationProps;
}

const AgendaPage: FC<TAgendaPageProps> = (props) => {
  const {
    pageHeaderProps,
    anchorSectionProps,
    contentSectionProps,
    accordionSectionProps,
    cookieNotificationProps
  } = props;

  return (
    <>
      <PageHeader {...pageHeaderProps} />
      <AnchorSection {...anchorSectionProps} />
      <ContentSection {...contentSectionProps} />
      <AccordionSection {...accordionSectionProps} />
      <CookieNotification {...cookieNotificationProps} />
    </>
  );
};

export default AgendaPage;