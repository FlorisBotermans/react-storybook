import { SidebarPosition, SidebarContentPosition } from '../components/SidebarNavigation';

const data = {
  title: 'Opleidingen',
  links: [
    {
      linkText: 'Design',
      linkUrl: '/content'
    },
    {
      linkText: 'Media',
      linkUrl: '/content'
    },
    {
      linkText: 'Theater',
      linkUrl: '/content'
    },
    {
      linkText: 'Beeldende kunst',
      linkUrl: '/content'
    },
    {
      linkText: 'Games en interactie',
      linkUrl: '/content'
    },
    {
      linkText: 'Kunst & economie',
      linkUrl: '/content'
    },
    {
      linkText: 'Muziek & technologie',
      linkUrl: '/content'
    },
    {
      linkText: 'Conservatorium',
      linkUrl: '/content'
    },
    {
      linkText: 'HKU College',
      linkUrl: '/content'
    }
  ],
  location: '/content',
  options: {
    compact: false,
    position: SidebarPosition.Right,
    contentPosition: SidebarContentPosition.SpaceAround,
    renderHeadline: false
  }
};

export default data;