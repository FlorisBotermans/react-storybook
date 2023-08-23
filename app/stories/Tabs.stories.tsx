import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Tabs from '../assets/ts/components/Tabs/Tabs';
import data from '../assets/ts/data/tabs';

export default {
    title: 'Molecules/Tabs',
    component: Tabs
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Default = Template.bind({});
Default.args = data;