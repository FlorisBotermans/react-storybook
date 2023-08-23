import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CookieNotification from '../assets/ts/components/CookieNotification';
import data from '../assets/ts/data/cookie-notification';

export default {
  title: 'Molecules/CookieNotification',
  component: CookieNotification
} as ComponentMeta<typeof CookieNotification>;

const Template: ComponentStory<typeof CookieNotification> = (args) => <CookieNotification {...args} />;

export const Default = Template.bind({});
Default.args = data;