import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import OpleidingPage from '../assets/ts/pages/OpleidingPage';

import navigationProps from '../assets/ts/data/navigation';
import topNavigationProps from '../assets/ts/data/top-navigation';

import * as AnchorMenu from '../stories/AnchorMenu.stories';
import * as AnchorSection from '../stories/AnchorSection.stories';
import * as KenmerkenSection from '../stories/KenmerkenSection.stories';
import * as ContentSection from '../stories/ContentSection.stories';
import * as TimelineSection from '../stories/TimelineSection.stories';
import * as CallToActionSection from '../stories/CTASection.stories';
import * as CookieNotification from '../stories/CookieNotification.stories';

export default {
  title: 'Pages/OpleidingPage',
  component: OpleidingPage
} as ComponentMeta<typeof OpleidingPage>;

const Template: ComponentStory<typeof OpleidingPage> = (args) => <OpleidingPage {...args} />;

export const Default = Template.bind({});
Default.args = {
  pageHeaderProps: { navigationProps, topNavigationProps },
  anchorMenuProps: AnchorMenu.Default.args,
  anchorSectionProps: AnchorSection.Default.args,
  kenmerkenSectionProps: KenmerkenSection.Default.args,
  contentSectionProps: ContentSection.Default.args,
  timelineSectionProps: TimelineSection.Default.args,
  callToActionSectionProps: CallToActionSection.Default.args,
  cookieNotificationProps: CookieNotification.Default.args
};