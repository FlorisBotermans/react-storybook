import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TopNavigation from '../assets/ts/components/TopNavigation/TopNavigation';
import data from '../assets/ts/data/top-navigation';

export default {
  title: 'Organisms/TopNavigation',
  component: TopNavigation
} as ComponentMeta<typeof TopNavigation>;

const Template: ComponentStory<typeof TopNavigation> = (args) => <TopNavigation {...args} />;

export const Default = Template.bind({});
Default.args = data;