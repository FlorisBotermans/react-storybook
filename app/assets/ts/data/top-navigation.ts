import { Image } from '../../../templates/helpers/image';

const data = {
  accent: 1,
  navigation: {
    text: 'Menu'
  },
  breadcrumbs: [
    {
      text: 'Home',
      url: '/home'
    },
    {
      text: 'Schools'
    },
    {
      text: 'Utrechts conservatorium',
      url: '/school'
    },
    {
      text: 'Basisopleiding HKU Utrechts conservatorium',
      url: '/opleiding'
    }
  ],
  account: {
    name: 'Wessel Kroos',
    imageUrls: Image('TopNavigationAccount', 0),
    items: [
      {
        text: 'Account instellingen',
        url: '/account'
      },
      {
        text: 'Uitloggen',
        url: '/logout'
      }
    ]
  },
  language: {
    url: '/home',
    text: 'en'
  },
  search: {
    text: 'Zoeken',
    action: '/search-results',
    fields: [
      {
        type: 'searchtext',
        placeholder: 'Zoeken...',
        label: 'Zoeken',
        name: 'text',
        value: '',
        autofocus: true,
        buttonText: 'Zoeken',
        requiredErrorMessage: ''
      }
    ]
  }
};

export default data;