import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Image } from '../templates/helpers/image';

import SearchResultsPage from '../assets/ts/pages/SearchResultsPage';

import navigationProps from '../assets/ts/data/navigation';
import topNavigationProps from '../assets/ts/data/top-navigation';

import * as Header from '../stories/Header.stories';
import * as SearchSection from '../stories/SearchSection.stories';
import * as CookieNotification from '../stories/CookieNotification.stories';

export default {
  title: 'Pages/SearchResultsPage',
  component: SearchResultsPage,
  parameters: {
    mockData: [
        {
            url: '/app/ajax/search-results.json',
            method: 'POST',
            status: 201,
            response: JSON.stringify({
                "total": 200,
                "items": [
                  {
                    "imageUrls": Image('SearchResult'),
                    "imageAlt": "Corona virus",
                    "title": "Corona virus",
                    "introPrefix": "22 December - 10:00 tot 16:00",
                    "intro": "Coronavirus intro",
                    "pageType": "Nieuws",
                    "url": "/nieuws",
                    "breadcrumb": [
                      {
                        "text": "Home",
                        "url": "/home"
                      },
                      {
                        "text": "Nieuwsbericht dat een hele lange titel is om te kijken of de breadcrumb dan naar de rechter kant uitlijnt",
                        "url": "/nieuws"
                      },
                      {
                        "text": "Opleiding",
                        "url": "/opleiding"
                      },
                      {
                        "text": "Nieuws",
                        "url": "/nieuws"
                      },
                      {
                        "text": "Opleiding",
                        "url": "/opleiding"
                      },
                      {
                        "text": "Nieuws",
                        "url": "/nieuws"
                      }
                    ]
                  },
                  {
                    "imageUrls": null,
                    "imageAlt": "Bachelor Audiovisual media",
                    "title": "Bachelor Audiovisual media",
                    "introPrefix": "",
                    "intro": "Studenten bepalen bij HKU grotendeels hun eigen route. Omdat je je breed ontwikkelt, word je allround en specialist tegelijk. Dit zie je terug in de veelzijdigheid van onze studenten.",
                    "pageType": "Opleiding",
                    "url": "/opleiding",
                    "breadcrumb": [
                      {
                        "text": "Home",
                        "url": "/home"
                      },
                      {
                        "text": "Opleiding",
                        "url": "/opleiding"
                      }
                    ]
                  },
                  {
                    "imageUrls": Image('SearchResult'),
                    "imageAlt": "Bachelor Audiovisual media",
                    "title": "Bachelor Audiovisual media",
                    "introPrefix": "",
                    "intro": "Studenten bepalen bij HKU grotendeels hun eigen route. Omdat je je breed ontwikkelt, word je allround en specialist tegelijk. Dit zie je terug in de veelzijdigheid van onze studenten.",
                    "pageType": "Opleiding",
                    "url": "/opleiding",
                    "breadcrumb": [
                      {
                        "text": "Home",
                        "url": "/home"
                      },
                      {
                        "text": "Opleiding",
                        "url": "/opleiding"
                      }
                    ]
                  }
                ]
              }, null, '\t')
        }
    ]
  }
} as ComponentMeta<typeof SearchResultsPage>;

const Template: ComponentStory<typeof SearchResultsPage> = (args) => <SearchResultsPage {...args} />;

export const Default = Template.bind({});
Default.args = {
  pageHeaderProps: { navigationProps, topNavigationProps },
  headerProps: Header.Default.args,
  searchSectionProps: SearchSection.Default.args,
  cookieNotificationProps: CookieNotification.Default.args
};