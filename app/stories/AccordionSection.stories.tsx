import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AccordionSection from '../assets/ts/components/AccordionSection/AccordionSection';
import data from '../assets/ts/data/accordion';

export default {
  title: 'Molecules/AccordionSection',
  component: AccordionSection,
  argTypes: {
    id: {
      table: {
        disable: true
      }
    }
  }
} as ComponentMeta<typeof AccordionSection>;

const Template: ComponentStory<typeof AccordionSection> = (args) => <AccordionSection {...args} />;

export const Default = Template.bind({});
Default.args = data;