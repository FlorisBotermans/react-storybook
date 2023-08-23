import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Header from '../assets/ts/components/Header/Header';
import data from '../assets/ts/data/header';

export default {
  title: 'Organisms/Header',
  component: Header
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = data;