import { TFieldProps } from '../Form';
import { Theme } from '../../utils/theme/typings';
import { TNavigationItem } from '../Navigation/typings';

export type TTopNavigationProps = {
  accent: Theme;
  navigation: {
    text: string;
  },
  breadcrumbs: TBreadcrumb[];
  account?: {
    name: string;
    imageUrls?: string[];
    items: TNavigationItem[];
  };
  language?: {
    text: string;
    url: string;
  };
  search?: {
    fields: TFieldProps[];
    action: string;
    text: string;
    submitErrorMessage: string;
  }
}

export type TBreadcrumb = {
  text: string;
  url: string;
}