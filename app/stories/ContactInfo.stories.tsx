import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ContactInfo from '../assets/ts/components/ContactInfo';
import data from '../assets/ts/data/contact-info';

export default {
  title: 'Atoms/ContactInfo',
  component: ContactInfo
} as ComponentMeta<typeof ContactInfo>;

const Template: ComponentStory<typeof ContactInfo> = (args) => <ContactInfo {...args} />;

export const Default = Template.bind({});
Default.args = data;