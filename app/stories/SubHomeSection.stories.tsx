import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SubHomeSection from '../assets/ts/components/SubHomeSection';
import data from '../assets/ts/data/subhome';

export default {
  title: 'Organisms/SubHomeSection',
  component: SubHomeSection
} as ComponentMeta<typeof SubHomeSection>;

const Template: ComponentStory<typeof SubHomeSection> = (args) => <SubHomeSection {...args} />;

export const Default = Template.bind({});
Default.args = data;