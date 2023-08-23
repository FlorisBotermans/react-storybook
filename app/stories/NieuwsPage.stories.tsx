import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import NieuwsPage from '../assets/ts/pages/NieuwsPage';

import navigationProps from '../assets/ts/data/navigation';
import topNavigationProps from '../assets/ts/data/top-navigation';

import * as ContentSection from '../stories/ContentSection.stories';
import * as AccordionSection from '../stories/AccordionSection.stories';
import * as CookieNotification from '../stories/CookieNotification.stories';

export default {
  title: 'Pages/NieuwsPage',
  component: NieuwsPage
} as ComponentMeta<typeof NieuwsPage>;

const Template: ComponentStory<typeof NieuwsPage> = (args) => <NieuwsPage {...args} />;

export const Default = Template.bind({});
Default.args = {
  pageHeaderProps: { navigationProps, topNavigationProps },
  contentSectionProps: ContentSection.Default.args,
  accordionSectionProps: AccordionSection.Default.args,
  cookieNotificationProps: CookieNotification.Default.args
};