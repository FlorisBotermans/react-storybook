import { Image } from '../../../templates/helpers/image';

const data = {
  banner: {
    linkText: 'Aanmelden via Studielink',
    linkUrl: '/aanmelden'
  },
  blocks: [
    {
      title: 'Nog even verder kijken',
      linkText: 'Terug naar overzicht',
      linkUrl: '/'
    },
    {
      title: 'Open dagen',
      linkText: 'Ga naar eventpagina',
      linkUrl: '/open-dag',
      imageUrls: Image('CTA', 2)
    },
    {
      title: 'Graphic Design',
      linkText: 'Bekijk deze opleiding',
      linkUrl: '/opleiding',
      imageUrls: Image('CTALarge', 1)
    },
    {
      title: 'Dit item mag niet getoond worden',
      linkText: 'Geen link tekst',
      linkUrl: '/en-geen-link'
    }
  ]
};

export default data;