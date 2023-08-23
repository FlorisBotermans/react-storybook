import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import CallToActionPage from '../assets/ts/pages/CallToActionPage';

import navigationProps from '../assets/ts/data/navigation';
import topNavigationProps from '../assets/ts/data/top-navigation';

import * as CallToAction from '../stories/CTASection.stories';
import * as CookieNotification from '../stories/CookieNotification.stories';

export default {
  title: 'Pages/CallToActionPage',
  component: CallToActionPage
} as ComponentMeta<typeof CallToActionPage>;

const Template: ComponentStory<typeof CallToActionPage> = (args) => <CallToActionPage {...args} />;

export const Default = Template.bind({});
Default.args = {
    pageHeaderProps: { navigationProps, topNavigationProps },
    callToActionSectionProps: CallToAction.Default.args,
    cookieNotificationProps: CookieNotification.Default.args
};