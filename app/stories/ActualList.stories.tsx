import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ActualList from '../assets/ts/components/SchoolSection/ActualList';
import data from '../assets/ts/data/actual-list';

export default {
  title: 'Molecules/ActualList',
  component: ActualList
} as ComponentMeta<typeof ActualList>;

const Template: ComponentStory<typeof ActualList> = (args) => <ActualList {...args} />;

export const Default = Template.bind({});
Default.args = data;