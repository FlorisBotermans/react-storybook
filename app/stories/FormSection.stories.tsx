import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FormSection from '../assets/ts/components/FormSection/FormSection';
import data from '../assets/ts/data/form';

export default {
  title: 'Organisms/FormSection',
  component: FormSection,
  argTypes: {
    id: {
      table: {
        disable: true
      }
    }
  }
} as ComponentMeta<typeof FormSection>;

const Template: ComponentStory<typeof FormSection> = (args) => <FormSection {...args} />;

export const Default = Template.bind({});
Default.args = data;