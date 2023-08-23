import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import BlockGridPage from '../assets/ts/pages/BlockGridPage';

import navigationProps from '../assets/ts/data/navigation';
import topNavigationProps from '../assets/ts/data/top-navigation';

import * as BlockGridSection from '../stories/BlockGridSection.stories';
import * as CookieNotification from '../stories/CookieNotification.stories';

export default {
  title: 'Pages/BlockGridPage',
  component: BlockGridPage
} as ComponentMeta<typeof BlockGridPage>;

const Template: ComponentStory<typeof BlockGridPage> = (args) => <BlockGridPage {...args} />;

export const Default = Template.bind({});
Default.args = {
    pageHeaderProps: { navigationProps, topNavigationProps },
    blockGridSectionProps: BlockGridSection.Default.args,
    cookieNotificationProps: CookieNotification.Default.args
};