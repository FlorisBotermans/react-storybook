import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ExpositionsSection from '../assets/ts/components/ExpositionsSection';
import data from '../assets/ts/data/expositions-section';

export default {
  title: 'Organisms/ExpositionsSection',
  component: ExpositionsSection,
  argTypes: {
    id: {
      table: {
        disable: true
      }
    }
  }
} as ComponentMeta<typeof ExpositionsSection>;

const Template: ComponentStory<typeof ExpositionsSection> = (args) => <ExpositionsSection {...args} />;

export const Default = Template.bind({});
Default.args = data;