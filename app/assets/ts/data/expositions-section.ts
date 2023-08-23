import { Image } from '../../../templates/helpers/image';

const data = {
  nextSlideText: 'Ga naar de volgende slide',
  items: [
    {
      title: 'Useable Shapes',
      artist: 'Matthijs Rodenburg',
      imageUrls: Image('Exposition'),
      linkUrl: '/content'
    },
    {
      title: 'Fragile',
      artist: 'Julie de Hingh',
      imageUrls: Image('Exposition', 1),
      linkUrl: '/content'
    },
    {
      title: 'Yeah Glitch',
      artist: 'Lotte Smits',
      imageUrls: Image('Exposition', 2),
      linkUrl: '/content'
    }
  ]
};

export default data;