import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import ContentPage from '../assets/ts/pages/ContentPage';

import navigationProps from '../assets/ts/data/navigation';
import topNavigationProps from '../assets/ts/data/top-navigation';

import * as Header from '../stories/Header.stories';
import * as Tabs from '../stories/Tabs.stories';
import * as ContentSection from '../stories/ContentSection.stories';
import * as Card from '../stories/Card.stories';
import * as AnchorMenu from '../stories/AnchorMenu.stories';
import * as MediaSection from '../stories/MediaSection.stories';
import * as MediaGallerySection from '../stories/MediaGallerySection.stories';
import * as AnchorSection from '../stories/AnchorSection.stories';
import * as CalendarSection from '../stories/CalendarSection.stories';
import * as TimelineSection from '../stories/TimelineSection.stories';
import * as CallToActionButtonSection from '../stories/CallToActionButtonSection.stories';
import * as ExpositionsSection from '../stories/ExpositionsSection.stories';
import * as AccordionSection from '../stories/AccordionSection.stories';
import * as BlockGridSection from '../stories/BlockGridSection.stories';
import * as CallToActionSection from '../stories/CTASection.stories';
import * as CookieNotification from '../stories/CookieNotification.stories';

export default {
  title: 'Pages/ContentPage',
  component: ContentPage
} as ComponentMeta<typeof ContentPage>;

const Template: ComponentStory<typeof ContentPage> = (args) => <ContentPage {...args} />;

export const Default = Template.bind({});
Default.args = {
    pageHeaderProps: { navigationProps, topNavigationProps },
    headerProps: Header.Default.args,
    tabsProps: Tabs.Default.args,
    contentSectionProps: ContentSection.Default.args,
    cardProps: Card.Default.args,
    anchorMenuProps: AnchorMenu.Default.args,
    mediaSectionProps: MediaSection.Default.args,
    mediaGallerySectionProps: MediaGallerySection.Default.args,
    anchorSectionProps: AnchorSection.Default.args,
    calendarSectionProps: CalendarSection.Default.args,
    timelineSectionProps: TimelineSection.Default.args,
    callToActionButtonSectionProps: CallToActionButtonSection.Default.args,
    expositionsSectionProps: ExpositionsSection.Default.args,
    accordionSectionProps: AccordionSection.Default.args,
    blockGridSectionProps: BlockGridSection.Default.args,
    callToActionSectionProps: CallToActionSection.Default.args,
    cookieNotificationProps: CookieNotification.Default.args
};