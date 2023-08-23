import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SchoolSection from '../assets/ts/components/SchoolSection/SchoolSection';
import data from '../assets/ts/data/school';

export default {
    title: 'Organisms/SchoolSection',
    component: SchoolSection
} as ComponentMeta<typeof SchoolSection>;

const Template: ComponentStory<typeof SchoolSection> = (args) => <SchoolSection {...args} />;

export const Default = Template.bind({});
Default.args = data;