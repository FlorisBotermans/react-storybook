import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Navigation from '../assets/ts/components/Navigation/Navigation';
import data from '../assets/ts/data/navigation';

export default {
  title: 'Organisms/Navigation',
  component: Navigation,
  argTypes: {
    open: {
      table: {
        disable: true
      }
    }
  }
} as ComponentMeta<typeof Navigation>;

const Template: ComponentStory<typeof Navigation> = (args) => <Navigation {...args} />;

export const Default = Template.bind({});
Default.args = data;