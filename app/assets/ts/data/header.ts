import { Image } from '../../../templates/helpers/image';

const data = {
  title: 'Header met een lange titel om te kijken wat er gebeurd',
  image: {
    imageUrls: Image('Header', 2),
    isFallback: true
  },
  information: `
      <h2 class="h4">Information header</h2>
      <p>Lorem ipsum</p>
    `,
  follow: {
    following: false,
    followText: 'Favoriet maken',
    unfollowText: 'Niet meer favoriet maken',
    url: '/ajax/follow/toggle.json',
    unfollowUrl: '/ajax/follow/toggle.json',
    networkErrorMessage: 'Er is geen verbinding met de server. Controleer je internet verbinding.'
  },
  language: {
    url: '/home',
    text: 'en'
  }
};

export default data;