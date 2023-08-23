import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ContactSection from '../assets/ts/components/ContactSection';
import data from '../assets/ts/data/contact-section';

export default {
  title: 'Organisms/ContactSection',
  component: ContactSection,
  argTypes: {
    id: {
      table: {
        disable: true
      }
    }
  }
} as ComponentMeta<typeof ContactSection>;

const Template: ComponentStory<typeof ContactSection> = (args) => <ContactSection {...args} />;

export const Default = Template.bind({});
Default.args = data;