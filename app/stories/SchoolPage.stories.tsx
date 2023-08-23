import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import SchoolPage from '../assets/ts/pages/SchoolPage';

import navigationProps from '../assets/ts/data/navigation';
import topNavigationProps from '../assets/ts/data/top-navigation';

import * as SchoolSection from '../stories/SchoolSection.stories';
import * as CookieNotification from '../stories/CookieNotification.stories';

export default {
  title: 'Pages/SchoolPage',
  component: SchoolPage
} as ComponentMeta<typeof SchoolPage>;

const Template: ComponentStory<typeof SchoolPage> = (args) => <SchoolPage {...args} />;

export const Default = Template.bind({});
Default.args = {
  pageHeaderProps: { navigationProps, topNavigationProps },
  schoolSectionProps: SchoolSection.Default.args,
  cookieNotificationProps: CookieNotification.Default.args
};