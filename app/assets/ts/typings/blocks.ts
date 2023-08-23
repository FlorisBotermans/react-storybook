import NewsGridBlock, { TNewsGridBlockProps } from '../components/GridBlock/NewsGridBlock';
import EventGridBlock, { TEventGridBlockProps } from '../components/GridBlock/EventGridBlock';
import EducationGridBlock, { TEducationGridBlockProps } from '../components/GridBlock/EducationGridBlock';
import ContentGridBlock, { TContentGridBlockProps } from '../components/GridBlock/ContentGridBlock';
// import ImageGridBlock from '../components/GridBlock/ImageGridBlock';
import ContactGridBlock, { TContactGridBlockProps } from '../components/GridBlock/ContactGridBlock';

export type TBlockProps = TNewsGridBlockProps | TEventGridBlockProps | TEducationGridBlockProps | TContentGridBlockProps | TContactGridBlockProps;
export type TBlock = typeof NewsGridBlock | typeof EventGridBlock | typeof EducationGridBlock | typeof ContentGridBlock | typeof ContactGridBlock; // typeof ImageGridBlock
export type PageType = 'News' | 'Event' | 'Education' | 'PageContent' | 'Contact' | 'Werkplaats' | 'Verhalen' | 'Expositie'; // | 'Image';
export type TItemProps = TBlockProps & { pageType: PageType };