import { Image } from '../../../templates/helpers/image';

const data = {
  nextSlideText: 'Ga naar de volgende slide',
  items: [
    {
      type: 'image',
      title: 'Useable Shapes',
      description: 'Matthijs Rodenburg',
      imageUrls: Image('MediaSlide'),
      imageSize: {
        width: 1248,
        height: 702
      },
      imageUrlsFull: Image('MediaSlideFull', 1),
      imageSizeFull: {
        width: 1920,
        height: 1920
      }
    },
    {
      type: 'image',
      title: 'Fragile',
      description: 'Julie de Hingh',
      imageUrls: Image('Media', 1),
      imageSize: {
        width: 940,
        height: 940
      },
      imageUrlsFull: Image('MediaSlideFull', 1),
      imageSizeFull: {
        width: 1920,
        height: 1920
      }
    },
    {
      type: 'video',
      title: 'YouTube video',
      description: 'YouTube video',
      videoUrl: 'https://www.youtube.com/watch?v=wURO7pi8EQ0',
      imageSize: {
        width: 1248,
        height: 702
      },
      imageSizeFull: {
        width: 1920,
        height: 1920
      }
    },
    {
      type: 'video',
      title: 'Vimeo video',
      description: 'Vimeo video',
      videoUrl: 'https://player.vimeo.com/video/27190558',
      imageUrls: Image('MediaSlide', 1),
      imageSize: {
        width: 1248,
        height: 702
      },
      imageUrlsFull: Image('MediaSlideFull', 1),
      imageSizeFull: {
        width: 1920,
        height: 1920
      }
    },
    {
      type: 'video',
      title: 'Vimeo embed',
      description: 'Vimeo embed',
      videoUrl: 'https://vimeo.com/event/1278809/embed',
      imageUrls: Image('MediaSlide', 1),
      imageSize: {
        width: 1248,
        height: 702
      },
      imageUrlsFull: Image('MediaSlideFull', 1),
      imageSizeFull: {
        width: 1920,
        height: 1920
      }
    }
  ],
  prevSlideText: 'Ga naar de vorige slide'
};

export default data;