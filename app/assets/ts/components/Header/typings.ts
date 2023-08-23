import { TFollowProps } from '../../blocks/Follow/typings';

export type THeaderProps = {
  title: string;
  image: {
    imageUrls?: string[];
    isFallback: boolean;
  }
  information?: string;
  follow: TFollowProps;
  language?: {
    text: string;
    url: string;
  }
}