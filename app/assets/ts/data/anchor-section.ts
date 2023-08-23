import { Image } from '../../../templates/helpers/image';

const data = {
  pageTitle: 'Audiovisual Media',
  title: 'Over de opleiding',
  anchor: 'De opleiding',
  imageUrls: Image('Anchor', 3),
  imageCredits: 'Credits',
  renderHeadline: true,
  breadcrumb: [
    { text: 'Home', url: '/home' },
    { text: 'Studeren', url: '/studeren' },
    { text: 'HKU Media', url: '/studeren/hku-media' },
    { text: 'En nog een kruimelpad item', url: '/studeren/hku-media/kruimelpad' }
  ]
};

export default data;