import React, { FC } from 'react';

import PageHeader, { TPageHeaderProps } from './header/PageHeader';

import AnchorMenu, { TAnchorMenuProps } from '../components/AnchorMenu';

import AnchorSection, { TAnchorSectionProps } from '../components/AnchorSection';

import KenmerkenSection, { TKenmerkenSectionProps } from '../components/KenmerkenSection';

import ContentSection, { TContentSectionProps } from '../components/ContentSection';

import TimelineSection from '../components/TimelineSection';
import { TTimelineSectionProps } from '../components/TimelineSection/typings';

import CTASection from '../components/CTASection';
import { TCTASectionProps } from '../components/CTASection/typings';

import CookieNotification, { TCookieNotificationProps } from '../components/CookieNotification';

type TOpleidingPageProps = {
  pageHeaderProps: TPageHeaderProps;
  anchorMenuProps: TAnchorMenuProps;
  anchorSectionProps: TAnchorSectionProps;
  kenmerkenSectionProps: TKenmerkenSectionProps;
  contentSectionProps: TContentSectionProps;
  timelineSectionProps: TTimelineSectionProps;
  callToActionSectionProps: TCTASectionProps;
  cookieNotificationProps: TCookieNotificationProps;
}

const OpleidingPage: FC<TOpleidingPageProps> = (props) => {
  const {
    pageHeaderProps,
    anchorMenuProps,
    anchorSectionProps,
    kenmerkenSectionProps,
    contentSectionProps,
    timelineSectionProps,
    callToActionSectionProps,
    cookieNotificationProps
  } = props;

  return (
    <>
      <PageHeader {...pageHeaderProps} />
      <AnchorMenu {...anchorMenuProps} />
      <AnchorSection {...anchorSectionProps} />
      <KenmerkenSection {...kenmerkenSectionProps} />
      <ContentSection {...contentSectionProps} />
      <AnchorSection {...anchorSectionProps} />
      <ContentSection {...contentSectionProps} />
      <AnchorSection {...anchorSectionProps} />
      <ContentSection {...contentSectionProps} />
      <AnchorSection {...anchorSectionProps} />
      <ContentSection {...contentSectionProps} />
      <AnchorSection {...anchorSectionProps} />
      <ContentSection {...contentSectionProps} />
      <TimelineSection {...timelineSectionProps} />
      <CTASection {...callToActionSectionProps} />
      <CookieNotification {...cookieNotificationProps} />
    </>
  );
};

export default OpleidingPage;