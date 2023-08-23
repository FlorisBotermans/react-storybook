import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ContentSection from '../assets/ts/components/ContentSection';
import data from '../assets/ts/data/content';

export default {
  title: 'Organisms/ContentSection',
  component: ContentSection,
  argTypes: {
    id: {
      table: {
        disable: true
      }
    }
  }
} as ComponentMeta<typeof ContentSection>;

const Template: ComponentStory<typeof ContentSection> = (args) => <ContentSection {...args} />;

export const Default = Template.bind({});
Default.args = data;