import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import OctoSection from '../assets/ts/components/OctoSection';
import data from '../assets/ts/data/octo-section';

export default {
  title: 'Visualizations/OctoSection',
  component: OctoSection
} as ComponentMeta<typeof OctoSection>;

const Template: ComponentStory<typeof OctoSection> = (args) => <OctoSection {...args} />;

export const Default = Template.bind({});
Default.args = data;