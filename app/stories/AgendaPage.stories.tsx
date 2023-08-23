import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import AgendaPage from '../assets/ts/pages/AgendaPage';

import navigationProps from '../assets/ts/data/navigation';
import topNavigationProps from '../assets/ts/data/top-navigation';

import * as AnchorSection from '../stories/AnchorSection.stories';
import * as ContentSection from '../stories/ContentSection.stories';
import * as AccordionSection from '../stories/AccordionSection.stories';
import * as CookieNotification from '../stories/CookieNotification.stories';

export default {
  title: 'Pages/AgendaPage',
  component: AgendaPage
} as ComponentMeta<typeof AgendaPage>;

const Template: ComponentStory<typeof AgendaPage> = (args) => <AgendaPage {...args} />;

export const Default = Template.bind({});
Default.args = {
    pageHeaderProps: { navigationProps, topNavigationProps },
    anchorSectionProps: AnchorSection.Default.args,
    contentSectionProps: ContentSection.Default.args,
    accordionSectionProps: AccordionSection.Default.args,
    cookieNotificationProps: CookieNotification.Default.args
};