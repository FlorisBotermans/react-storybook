import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import FormulierenPage from '../assets/ts/pages/FormulierenPage';

import navigationProps from '../assets/ts/data/navigation';
import topNavigationProps from '../assets/ts/data/top-navigation';

import * as FormSection from '../stories/FormSection.stories';
import * as CookieNotification from '../stories/CookieNotification.stories';

export default {
  title: 'Pages/FormulierenPage',
  component: FormulierenPage
} as ComponentMeta<typeof FormulierenPage>;

const Template: ComponentStory<typeof FormulierenPage> = (args) => <FormulierenPage {...args} />;

export const Default = Template.bind({});
Default.args = {
    pageHeaderProps: { navigationProps, topNavigationProps },
    formSectionProps: FormSection.Default.args,
    cookieNotificationProps: CookieNotification.Default.args
};