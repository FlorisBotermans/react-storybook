import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import BlockGridSection from '../assets/ts/components/BlockGridSection/BlockGridSection';
import data from '../assets/ts/data/block-grid';

export default {
  title: 'Organisms/BlockGridSection',
  component: BlockGridSection,
  argTypes: {
    id: {
      table: {
        disable: true
      }
    },
    pageTitle: {
      table: {
        disable: true
      }
    }
  }
} as ComponentMeta<typeof BlockGridSection>;

const Template: ComponentStory<typeof BlockGridSection> = (args) => <BlockGridSection {...args} />;

export const Default = Template.bind({});
Default.args = data;