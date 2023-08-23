import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TimelineSection from '../assets/ts/components/TimelineSection/TimelineSection';
import data from '../assets/ts/data/timeline-section';

export default {
  title: 'Organisms/TimelineSection',
  component: TimelineSection,
  argTypes: {
    id: {
      table: {
        disable: true
      }
    }
  }
} as ComponentMeta<typeof TimelineSection>;

const Template: ComponentStory<typeof TimelineSection> = (args) => <TimelineSection {...args} />;

export const Default = Template.bind({});
Default.args = data;