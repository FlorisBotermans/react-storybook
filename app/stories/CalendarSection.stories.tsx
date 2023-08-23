import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CalendarSection from '../assets/ts/components/CalendarSection/CalendarSection';
import data from '../assets/ts/data/calendar';

export default {
  title: 'Organisms/CalendarSection',
  component: CalendarSection,
  argTypes: {
    start: {
      control: 'date'
    },
    end: {
      control: 'date'
    },
    id: {
      table: {
        disable: true
      }
    }
  }
} as ComponentMeta<typeof CalendarSection>;

const Template: ComponentStory<typeof CalendarSection> = (args) => <CalendarSection {...args} />;

export const Default = Template.bind({});
Default.args = data;