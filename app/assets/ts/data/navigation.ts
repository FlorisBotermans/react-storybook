function generateRandomItems(item1, item2?, withSeparators = true) {
  return new Array(5 + Math.ceil(Math.random() * 10))
    .fill(undefined)
    .map((item, i) => (withSeparators && i % 2 !== 0 && Math.random() > 0.5)
      ? { type: 'separator' }
      : {
          text: `${item1.name} ${Math.ceil(Math.pow(0.9 + Math.random(), 30))}`,
          url: item1.url,
          items: item2
            ? new Array(2 + Math.ceil(Math.random() * 10))
              .fill(undefined)
              .map((item, j) => (j !== 0 && (1 + j) % 2 !== 0 && Math.random() > 0.5)
                ? { type: 'separator' }
                : {
                    text: `${item2.name} ${Math.ceil(Math.pow(0.9 + Math.random(), 30))}`,
                    url: item2.url
                  }
              )
            : undefined
        }
    )
  // Prevent separators at the beginning or the end of the list
    .filter((item, i) => !(item.type === 'separator' && i === 0))
    .reverse()
    .filter((item, i) => !(item.type === 'separator' && i === 0))
    .reverse();
}

const data = {
  accent: 1,
  open: false,
  logo: {
    url: '/home',
    imageUrl: '/content/logo-medewerkers.svg',
    text: 'Medewerkers Portal'
  },
  mainItems: [
    {
      icon: 'home',
      text: 'Home',
      url: '/home'
    },
    {
      icon: 'favorite',
      text: 'Mijn favorieten',
      url: '/favorites',
      items: [
        ...generateRandomItems({ name: 'Favoriet', url: '/content' }, undefined, false),
        {
          type: 'separator'
        },
        {
          icon: 'edit',
          text: 'Beheer favorieten',
          url: '/favorites'
        }
      ]
    },
    {
      icon: 'apps',
      text: 'Mijn apps',
      url: '/apps',
      items: [
        ...generateRandomItems({ name: 'App', url: 'https://webmail.hku.nl' }, undefined, false),
        {
          type: 'separator'
        },
        {
          icon: 'edit',
          text: 'Beheer apps',
          url: '/apps'
        }
      ]
    },
    {
      icon: 'user',
      text: 'Fasion Design',
      url: '/school',
      items: [
        ...generateRandomItems({ name: 'Opleiding informatie', url: '/content' }, undefined, false),
        {
          type: 'separator'
        },
        {
          icon: 'edit',
          text: 'Beheer opleidingen',
          url: '/apps'
        }
      ]
    }
  ],
  navItems: [
    {
      type: 'header',
      text: 'Algemeen'
    },
    {
      text: 'Schools',
      url: '/schools',
      items: generateRandomItems({ name: 'School', url: '/school' }, { name: 'Opleiding', url: '/opleiding' })
    },
    {
      text: 'Begeleiding',
      url: '/content',
      items: generateRandomItems({ name: 'Begeleiding', url: '/content' })
    },
    {
      text: 'Studentenzaken',
      url: '/content',
      items: generateRandomItems({ name: 'Zaak', url: '/content' })
    },
    {
      text: 'Locaties',
      url: '/content',
      items: generateRandomItems({ name: 'Locatie', url: '/content' })
    },
    {
      text: 'Faciliteiten',
      url: '/content',
      items: generateRandomItems({ name: 'Faciliteit', url: '/content' })
    },
    {
      text: 'Werkvelden',
      url: '/content',
      items: generateRandomItems({ name: 'Werkveld', url: '/content' })
    },
    {
      type: 'separator'
    },
    {
      text: 'Nieuws & agenda',
      url: '/overzicht-blokken'
    },
    {
      text: 'Veelgestelde vragen',
      url: '/faq'
    }
  ]
};

export default data;