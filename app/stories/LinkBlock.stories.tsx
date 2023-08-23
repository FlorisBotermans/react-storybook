import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import LinkBlock from '../assets/ts/components/LinkBlock';
import data from '../assets/ts/data/link-block';

export default {
  title: 'Molecules/LinkBlock',
  component: LinkBlock
} as ComponentMeta<typeof LinkBlock>;

const Template: ComponentStory<typeof LinkBlock> = (args) => <LinkBlock {...args} />;

export const Default = Template.bind({});
Default.args = data;