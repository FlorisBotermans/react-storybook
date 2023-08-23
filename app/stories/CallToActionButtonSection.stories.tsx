import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CallToActionButtonSection from '../assets/ts/components/CallToActionButtonSection';
import data from '../assets/ts/data/cta-button';

export default {
  title: 'Molecules/CallToActionButtonSection',
  component: CallToActionButtonSection,
  argTypes: {
    id: {
      table: {
        disable: true
      }
    }
  }
} as ComponentMeta<typeof CallToActionButtonSection>;

const Template: ComponentStory<typeof CallToActionButtonSection> = (args) => <CallToActionButtonSection {...args} />;

export const Default = Template.bind({});
Default.args = data;