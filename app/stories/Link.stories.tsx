import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Link from '../assets/ts/components/Link';
import data from '../assets/ts/data/link';

export default {
  title: 'Atoms/Link',
  component: Link
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = (args) => <Link {...args} />;

export const Default = Template.bind({});
Default.args = data;