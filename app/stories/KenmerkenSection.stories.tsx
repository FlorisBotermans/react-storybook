import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import KenmerkenSection from '../assets/ts/components/KenmerkenSection';
import data from '../assets/ts/data/kenmerken';

export default {
  title: 'Molecules/KenmerkenSection',
  component: KenmerkenSection,
  argTypes: {
    id: {
      table: {
        disable: true
      }
    }
  }
} as ComponentMeta<typeof KenmerkenSection>;

const Template: ComponentStory<typeof KenmerkenSection> = (args) => <KenmerkenSection {...args} />;

export const Default = Template.bind({});
Default.args = data;