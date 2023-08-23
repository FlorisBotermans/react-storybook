import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SchoolInfo from '../assets/ts/components/SchoolSection/SchoolInfo';
import data from '../assets/ts/data/school-info';

export default {
  title: 'Molecules/SchoolInfo',
  component: SchoolInfo
} as ComponentMeta<typeof SchoolInfo>;

const Template: ComponentStory<typeof SchoolInfo> = (args) => <SchoolInfo {...args} />;

export const Default = Template.bind({});
Default.args = data;