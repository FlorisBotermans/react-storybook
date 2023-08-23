import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SidebarNavigation from '../assets/ts/components/SidebarNavigation';
import data from '../assets/ts/data/sidebar-navigation';

export default {
    title: 'Organisms/SidebarNavigation',
    component: SidebarNavigation
} as ComponentMeta<typeof SidebarNavigation>;

const Template: ComponentStory<typeof SidebarNavigation> = (args) => <SidebarNavigation {...args} />;

export const Default = Template.bind({});
Default.args = data;