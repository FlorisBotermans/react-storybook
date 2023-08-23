import { Image } from '../../../templates/helpers/image';

const data = {
  title: 'Media',
  navigatie: {
    opleiding: 'Opleidingen',
    werkplaatsen: 'Werkplaatsen',
    actualiteit: 'Nieuws & events',
    verhalen: 'Verhalen',
    info: 'Over HKU Media'
  },
  info: {
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
  },
  opleidingen: [
    {
      title: 'Graphic Design',
      subTitle: 'Bachelor',
      imageUrls: Image('LinkBlock'),
      linkUrl: '/opleiding'
    },
    {
      title: 'Audiovisual Media',
      subTitle: 'Master',
      imageUrls: Image('LinkBlock', 2),
      linkUrl: '/opleiding'
    },
    {
      title: 'Animation',
      subTitle: 'Bachelor',
      imageUrls: Image('LinkBlock'),
      linkUrl: '/opleiding'
    }
  ],
  werkplaatsen: [
    {
      title: 'Werkplaats 1',
      imageUrls: Image('LinkBlock', 3),
      linkUrl: '/content'
    },
    {
      title: 'Werkplaats 2',
      imageUrls: Image('LinkBlock', 0),
      linkUrl: '/content'
    },
    {
      title: 'Werkplaats 3',
      imageUrls: Image('LinkBlock', 3),
      linkUrl: '/content'
    },
    {
      title: 'Werkplaats 4',
      imageUrls: Image('LinkBlock', 3),
      linkUrl: '/content'
    },
    {
      title: 'Werkplaats 5',
      imageUrls: Image('LinkBlock', 3),
      linkUrl: '/content'
    },
    {
      title: 'Werkplaats 6',
      imageUrls: Image('LinkBlock', 3),
      linkUrl: '/content'
    },
    {
      title: 'Werkplaats 7',
      imageUrls: Image('LinkBlock', 3),
      linkUrl: '/content'
    }
  ],
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
  ],
  verhalen: [
    {
      title: 'Klein Duimpje',
      type: 'Verhaal',
      imageUrls: Image('Block'),
      linkUrl: '/nieuws/coronavirus'
    },
    {
      title: 'Roodkapje',
      type: 'Verhaal',
      imageUrls: Image('Block'),
      linkUrl: '/content'
    },
    {
      title: 'De gelaarsde kat',
      type: 'Verhaal',
      imageUrls: Image('Block'),
      linkUrl: '/nieuws/coronavirus'
    },
    {
      title: 'Doornroosje',
      type: 'Verhaal',
      imageUrls: Image('Block'),
      linkUrl: '/content'
    },
    {
      title: 'Pinokkio',
      subTitle: 'Auteur',
      type: 'Verhaal',
      imageUrls: Image('Block'),
      linkUrl: '/nieuws/coronavirus'
    },
    {
      title: 'De wolf en de zeven geitjes',
      type: 'Verhaal',
      imageUrls: Image('Block'),
      linkUrl: '/content'
    }
  ],
  links: [
    {
      linkUrl: 'content',
      linkText: 'Muziekontwerp'
    }
  ]
};

export default data;