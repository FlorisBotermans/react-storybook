import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SearchSection from '../assets/ts/components/SearchSection';
import data from '../assets/ts/data/search-section';

export default {
  title: 'Molecules/SearchSection',
  component: SearchSection,
  argTypes: {
    onLayout: {
      table: {
        disable: true
      }
    }
  }
} as ComponentMeta<typeof SearchSection>;

const Template: ComponentStory<typeof SearchSection> = (args) => <SearchSection {...args} />;

export const Default = Template.bind({});
Default.args = data;