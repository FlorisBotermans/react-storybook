import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Exposition from '../assets/ts/components/Exposition';
import data from '../assets/ts/data/exposition';

export default {
  title: 'Molecules/Exposition',
  component: Exposition
} as ComponentMeta<typeof Exposition>;

const Template: ComponentStory<typeof Exposition> = (args) => <Exposition {...args} />;

export const Default = Template.bind({});
Default.args = data;