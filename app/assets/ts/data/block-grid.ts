import { Image } from '../../../templates/helpers/image';

const data = {
  title: 'Wat er speelt',
  intro: 'Afgestudeerde AVM’er staan bekend om hun veelzijdigheid. Tijdens de studie heb je ervaring opgedaan met alle kanten van het vak (organisatorisch, technisch en productioneel) en tijdens het maken van uiteenlopende producties in diverse genres verschillende rollen vervuld. Je kan zowel autonoom als in opdracht werken. Afgestudeerden werken vaak als zzp’er of in loondienst voor productiebedrijven binnen de audiovisuele, film- en televisiebranche. Kortom: op grond van je kennis en ervaring ben je breed inzetbaar in de film-, televisie- en audiovisuele wereld.',
  items: [
    {
      title: 'Nieuws',
      linkUrl: '/overzicht-blokken',
      linkText: 'Laad meer',
      pageType: 'News',
      items: [
        {
          title: 'Grensverleggend onderwijs: MA Education in Arts!',
          type: 'Nieuws',
          pageType: 'News',
          imageUrls: Image('Block'),
          linkUrl: '/nieuws/grensverleggend-onderwijs-ma-education',
          date: new Date('2020-05-10T04:00:00Z')
        },
        {
          title: 'Nog een nieuwsbericht',
          type: 'Nieuws',
          pageType: 'News',
          imageUrls: Image('Block'),
          linkUrl: '/nieuws/grensverleggend-onderwijs-ma-education',
          date: new Date('2020-05-10T04:00:00Z')
        }
      ]
    },
    {
      title: 'Agenda',
      linkUrl: '/overzicht-blokken',
      linkText: 'Laad meer',
      pageType: 'Event',
      items: [
        {
          title: 'Corona: verbonden door verhalen',
          subTitle: '10:00 uur tot 11:00 uur',
          type: 'Agenda',
          pageType: 'Event',
          imageUrls: Image('Block'),
          linkUrl: '/agenda/voorspeelavond-klassiek-piano',
          startDate: new Date('2018-05-18T10:00:00Z'),
          endDate: new Date('2018-05-20T11:00:00Z')
        }
      ]
    },
    {
      title: 'Werkplaatsen',
      pageType: 'Werkplaats',
      items: [
        {
          title: 'Creatieve maakprocessen en Multidisciplinariteit',
          type: 'Werkplaats',
          pageType: 'Werkplaats',
          imageUrls: Image('Block'),
          linkUrl: '/content'
        }
      ]
    },
    {
      title: 'Content',
      pageType: 'PageContent',
      items: [
        {
          title: 'Creatieve maakprocessen en Multidisciplinariteit',
          type: 'Onderzoeksgebied',
          pageType: 'PageContent',
          imageUrls: Image('Block'),
          linkUrl: '/content'
        }
      ]
    }
  ]
};

export default data;