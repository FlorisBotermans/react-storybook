import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MediaSection from '../assets/ts/components/MediaSection/MediaSection';
import data from '../assets/ts/data/media-section';

export default {
  title: 'Molecules/MediaSection',
  component: MediaSection,
  argTypes: {
    id: {
      table: {
        disable: true
      }
    }
  }
} as ComponentMeta<typeof MediaSection>;

const Template: ComponentStory<typeof MediaSection> = (args) => <MediaSection {...args} />;

export const Default = Template.bind({});
Default.args = data;