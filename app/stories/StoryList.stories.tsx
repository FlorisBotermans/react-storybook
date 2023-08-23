import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import StoryList from '../assets/ts/components/SchoolSection/StoryList';
import data from '../assets/ts/data/story-list';

export default {
  title: 'Molecules/StoryList',
  component: StoryList
} as ComponentMeta<typeof StoryList>;

const Template: ComponentStory<typeof StoryList> = (args) => <StoryList {...args} />;

export const Default = Template.bind({});
Default.args = data;