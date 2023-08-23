import { Image } from '../../../templates/helpers/image';

const data = {
  nieuws: [
    {
      title: 'Coronavirus: blijf op de hoogte wat HKU doet 1',
      type: 'Nieuws',
      imageUrls: Image('Block'),
      linkUrl: '/nieuws/coronavirus',
      publishDate: Date.now()
    },
    {
      title: 'Grensverleggend onderwijs: MA Education in Arts! 2',
      type: 'Nieuws',
      imageUrls: Image('Block'),
      linkUrl: '/nieuws/grensverleggend-onderwijs-ma-education',
      publishDate: new Date('2020-05-10T04:00:00Z')
    },
    {
      title: 'Coronavirus: blijf op de hoogte wat HKU doet 3',
      type: 'Nieuws',
      imageUrls: Image('Block'),
      linkUrl: '/nieuws/coronavirus',
      publishDate: Date.now()
    },
    {
      title: 'Grensverleggend onderwijs: MA Education in Arts! 4',
      type: 'Nieuws',
      imageUrls: Image('Block'),
      linkUrl: '/nieuws/grensverleggend-onderwijs-ma-education',
      publishDate: new Date('2020-05-10T04:00:00Z')
    },
    {
      title: 'Coronavirus: blijf op de hoogte wat HKU doet 5',
      type: 'Nieuws',
      imageUrls: Image('Block'),
      linkUrl: '/nieuws/coronavirus',
      publishDate: Date.now()
    },
    {
      title: 'Grensverleggend onderwijs: MA Education in Arts! 6',
      type: 'Nieuws',
      imageUrls: Image('Block'),
      linkUrl: '/nieuws/grensverleggend-onderwijs-ma-education',
      publishDate: new Date('2020-05-10T04:00:00Z')
    }
  ],
  evenementen: [
    {
      title: 'Meld je aan voor de online voorlichting!',
      subTitle: '04:00 uur tot 10:00 uur',
      type: 'Agenda',
      imageUrls: Image('Block'),
      linkUrl: '/agenda/voorspeelavond-klassiek-piano',
      startDate: new Date('2018-05-05T04:00:00Z'),
      endDate: new Date('2018-05-05T10:00:00Z')
    },
    {
      title: 'Corona: verbonden door verhalen',
      type: 'Agenda',
      subTitle: '10:00 uur',
      imageUrls: Image('Block'),
      linkUrl: '/agenda/voorspeelavond-klassiek-piano',
      startDate: new Date('2018-05-18T10:00:00Z')
    }
  ]
};

export default data;