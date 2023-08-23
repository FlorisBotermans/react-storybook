import { Image } from '../../../templates/helpers/image';

const data = {
  title: 'Over HKU Media',
  intro: 'Ben je er klaar voor om hard aan de slag te gaan met animatie, film, tekenen, illustratie, fotografie of grafisch ontwerp? Wil je ontdekken, experimenteren en samenwerken? Bij HKU Media word je een professional in het vertellen en presenteren van kritische, artistieke en indringende verhalen.',
  imageUrls: Image('Header'),
  linkUrl: '/content',
  linkText: 'Meer over HKU Media',
  contact: [
    {
      title: 'Pastoe fabriek 1',
      type: 'Contact & Locatie',
      imageUrls: Image('Block'),
      linkUrl: '/contact',
      linkText: 'Meer informatie',
      labels: ['030 20 91 409', 'Rostoord 3', '3523CL Utrecht']
    },
    {
      title: 'Pastoe fabriek 2',
      type: 'Contact & Locatie',
      imageUrls: Image('Block'),
      linkUrl: '/contact',
      linkText: 'Meer informatie',
      labels: ['030 20 91 409', 'Rostoord 3', '3523CL Utrecht']
    },
    {
      title: 'Pastoe fabriek 3',
      type: 'Contact & Locatie',
      imageUrls: Image('Block'),
      linkUrl: '/contact',
      linkText: 'Meer informatie',
      labels: ['030 20 91 409', 'Rostoord 3', '3523CL Utrecht']
    }
  ]
};

export default data;