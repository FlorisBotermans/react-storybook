import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CTASection from '../assets/ts/components/CTASection/CTASection';
import data from '../assets/ts/data/cta';

export default {
  title: 'Organisms/CTASection',
  component: CTASection,
  argTypes: {
    id: {
      table: {
        disable: true
      }
    }
  }
} as ComponentMeta<typeof CTASection>;

const Template: ComponentStory<typeof CTASection> = (args) => <CTASection {...args} />;

export const Default = Template.bind({});
Default.args = data;