import React, { FC } from 'react';

import PageHeader, { TPageHeaderProps } from './header/PageHeader';

import Header from '../components/Header';
import { THeaderProps } from '../components/Header/typings';

import Tabs from '../components/Tabs';
import { TTabsProps } from '../components/Tabs/typings';

import ContentSection, { TContentSectionProps } from '../components/ContentSection';

import Card from '../components/Card';
import { TCardProps } from '../components/Card/typings';

import AnchorMenu, { TAnchorMenuProps } from '../components/AnchorMenu';

import MediaSection from '../components/MediaSection';
import { TMediaSectionProps } from '../components/MediaSection/typings';

import MediaGallerySection from '../components/MediaGallerySection';
import { TMediaGallerySectionProps } from '../components/MediaGallerySection/typings';

import AnchorSection, { TAnchorSectionProps } from '../components/AnchorSection';

import CalendarSection from '../components/CalendarSection';
import { TCalendarSectionProps } from '../components/CalendarSection/typings';

import TimelineSection from '../components/TimelineSection';
import { TTimelineSectionProps } from '../components/TimelineSection/typings';

import CallToActionButtonSection, { TCallToActionButtonSectionProps } from '../components/CallToActionButtonSection';

import ExpositionsSection, { TExpositionsSectionProps } from '../components/ExpositionsSection';

import AccordionSection from '../components/AccordionSection';
import { TAccordionSectionProps } from '../components/AccordionSection/types';

import BlockGridSection from '../components/BlockGridSection';
import { TBlockGridSectionProps } from '../components/BlockGridSection/typings';

import CTASection from '../components/CTASection';
import { TCTASectionProps } from '../components/CTASection/typings';

import CookieNotification, { TCookieNotificationProps } from '../components/CookieNotification';

type TBlockGridPageProps = {
  pageHeaderProps: TPageHeaderProps;
  headerProps: THeaderProps;
  tabsProps: TTabsProps;
  contentSectionProps: TContentSectionProps;
  cardProps: TCardProps;
  anchorMenuProps: TAnchorMenuProps;
  mediaSectionProps: TMediaSectionProps;
  mediaGallerySectionProps: TMediaGallerySectionProps;
  anchorSectionProps: TAnchorSectionProps;
  calendarSectionProps: TCalendarSectionProps;
  timelineSectionProps: TTimelineSectionProps;
  callToActionButtonSectionProps: TCallToActionButtonSectionProps;
  expositionsSectionProps: TExpositionsSectionProps;
  accordionSectionProps: TAccordionSectionProps;
  blockGridSectionProps: TBlockGridSectionProps;
  callToActionSectionProps: TCTASectionProps;
  cookieNotificationProps: TCookieNotificationProps;
}

const BlockGridPage: FC<TBlockGridPageProps> = (props) => {
  const {
    pageHeaderProps,
    headerProps,
    tabsProps,
    contentSectionProps,
    cardProps,
    anchorMenuProps,
    mediaSectionProps,
    mediaGallerySectionProps,
    anchorSectionProps,
    calendarSectionProps,
    timelineSectionProps,
    callToActionButtonSectionProps,
    expositionsSectionProps,
    accordionSectionProps,
    blockGridSectionProps,
    callToActionSectionProps,
    cookieNotificationProps
  } = props;

  return (
    <>
      <PageHeader {...pageHeaderProps} />
      <Header {...headerProps} />
      <Tabs {...tabsProps} />
      <ContentSection {...contentSectionProps} />
      <div className='row'>
        <div className='row__column row__column--2'>
            <Card {...cardProps} />
        </div>
        <div className='row__column'>
            <Card {...cardProps} />
        </div>
        <div className='row__column'>
            <Card {...cardProps} />
        </div>
      </div>
      <div className='row'>
        <div className='row__column row__column--2'>
            <Card {...cardProps} imageUrls={['https://via.placeholder.com/333x170/5f6f93/46567a?text=333x170']} />
        </div>
        <div className='row__column'>
            <Card {...cardProps} imageUrls={['https://via.placeholder.com/333x170/5f6f93/46567a?text=333x170']} />
        </div>
        <div className='row__column'>
            <Card {...cardProps} imageUrls={['https://via.placeholder.com/333x170/5f6f93/46567a?text=333x170']} />
        </div>
      </div>
      <AnchorMenu {...anchorMenuProps} />
      <ContentSection {...contentSectionProps} />
      <div className='row'>
        <div className='row__column row__column--2'>
            <ContentSection {...contentSectionProps} />
        </div>
        <div className='row__column'>
            <ContentSection {...contentSectionProps} />
            <MediaSection {...mediaSectionProps} />
        </div>
      </div>
      <ContentSection {...contentSectionProps} />
      <MediaGallerySection {...mediaGallerySectionProps} />
      <AnchorSection {...anchorSectionProps} />
      <ContentSection {...contentSectionProps} />
      <AnchorSection {...anchorSectionProps} />
      <CalendarSection {...calendarSectionProps} />
      <TimelineSection {...timelineSectionProps} />
    </>
  );
};

export default BlockGridPage;