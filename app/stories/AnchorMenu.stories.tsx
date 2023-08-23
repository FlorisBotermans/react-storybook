import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AnchorMenu from '../assets/ts/components/AnchorMenu';
import data from '../assets/ts/data/anchor-menu';

export default {
  title: 'molecules/AnchorMenu',
  component: AnchorMenu
} as ComponentMeta<typeof AnchorMenu>;

const Template: ComponentStory<typeof AnchorMenu> = (args) => <AnchorMenu {...args} />;

export const Default = Template.bind({});
Default.args = data;