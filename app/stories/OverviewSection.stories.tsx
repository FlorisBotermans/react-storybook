import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import OverviewSection from '../assets/ts/components/OverviewSection';
import data from '../assets/ts/data/overzicht-blokken';

export default {
  title: 'Organisms/OverviewSection',
  component: OverviewSection,
  parameters: {
    mockData: [
        {
            url: '/overview-results.json',
            method: 'POST',
            status: 201,
            response: [1, 3, 5, 7]
        }
    ]
  }
} as ComponentMeta<typeof OverviewSection>;

const Template: ComponentStory<typeof OverviewSection> = (args) => <OverviewSection {...args} />;

export const Default = Template.bind({});
Default.args = data;