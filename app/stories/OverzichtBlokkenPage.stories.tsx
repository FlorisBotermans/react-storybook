import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import OverzichtBlokkenPage from '../assets/ts/pages/OverzichtBlokkenPage';

import navigationProps from '../assets/ts/data/navigation';
import topNavigationProps from '../assets/ts/data/top-navigation';

import * as OverviewSection from '../stories/OverviewSection.stories';
import * as CookieNotification from '../stories/CookieNotification.stories';

export default {
  title: 'Pages/OverzichtBlokkenPage',
  component: OverzichtBlokkenPage,
  parameters: {
    mockData: [
        {
            url: '/overview-results.json',
            method: 'POST',
            status: 201,
            response: [1, 3, 5, 7]
        }
    ]
  }
} as ComponentMeta<typeof OverzichtBlokkenPage>;

const Template: ComponentStory<typeof OverzichtBlokkenPage> = (args) => <OverzichtBlokkenPage {...args} />;

export const Default = Template.bind({});
Default.args = {
  pageHeaderProps: { navigationProps, topNavigationProps },
  overviewSectionProps: OverviewSection.Default.args,
  cookieNotificationProps: CookieNotification.Default.args
};