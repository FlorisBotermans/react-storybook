import { PageType } from '../../typings/blocks';
import { TContactGridBlockProps } from '../GridBlock/ContactGridBlock';
import { TNewsGridBlockProps } from '../GridBlock/NewsGridBlock';
import { TContentGridBlockProps } from '../GridBlock/ContentGridBlock';
import { TEventGridBlockProps } from '../GridBlock/EventGridBlock';

export enum GridSectionTheme {
  Primary = 0,
  Secondary = 1
}

export type GridSectionItem = {
  title: string;
  pageType?: PageType;
  linkUrl: string;
  linkText: string;
  items: TContactGridBlockProps[] | TNewsGridBlockProps[] | TContentGridBlockProps[] | TEventGridBlockProps[];
  theme: GridSectionTheme;
}

export type TBlockGridSectionProps = {
  id?: string;
  pageTitle: string;
  title: string;
  theme: GridSectionTheme
  items: GridSectionItem[];
};
