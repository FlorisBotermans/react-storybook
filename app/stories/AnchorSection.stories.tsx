import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AnchorSection from '../assets/ts/components/AnchorSection';
import data from '../assets/ts/data/anchor-section';

export default {
  title: 'Organisms/AnchorSection',
  component: AnchorSection,
  argTypes: {
    id: {
      table: {
        disable: true
      }
    }
  }
} as ComponentMeta<typeof AnchorSection>;

const Template: ComponentStory<typeof AnchorSection> = (args) => <AnchorSection {...args} />;

export const Default = Template.bind({});
Default.args = data;