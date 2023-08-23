import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Card from '../assets/ts/components/Card/Card';
import data from '../assets/ts/data/card';

export default {
  title: 'Atoms/Card',
  component: Card
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = data;