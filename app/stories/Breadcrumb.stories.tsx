import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Breadcrumb from '../assets/ts/components/Breadcrumb';
import data from '../assets/ts/data/breadcrumb';

export default {
  title: 'Atoms/Breadcrumb',
  component: Breadcrumb
} as ComponentMeta<typeof Breadcrumb>;

const Template: ComponentStory<typeof Breadcrumb> = (args) => <Breadcrumb {...args} />;

export const Default = Template.bind({});
Default.args = data;