import { Theme } from '../../utils/theme/typings';

export type TNavigationProps = {
  accent: Theme;
  open?: boolean;
  logo: {
    url: string;
    imageUrl: string;
    text: string;
  };
  mainItems: TNavigationItem[];
  navItems: TNavigationItem[];
};

export type NavigationItemType = 'header' | 'separator';

export type TNavigationItem = {
  type?: NavigationItemType;
};

export type TNavigationItemSeparator = TNavigationItem;

export type TNavigationItemHeader = TNavigationItem & {
  text: string;
};

export type TNavigationItemDefault = TNavigationItem & {
  icon?: string;
  text: string;
  url?: string;
  items: TNavigationItem[];
};

export type TNavigationSectionProps = {
  items: TNavigationItem[];
  focused?: boolean;
  onItemFocusChanged?: (focused: boolean) => void;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
  topOffset?: number;
  scrollable?: boolean;
  parentItemRef?: React.MutableRefObject<HTMLLIElement>;
};

export type TNavigationItemDefaultProps = TNavigationItemDefault & {
  onFocusChanged?: (focused: boolean) => void;
  topOffset?: number;
};

export type TNavigationList = {
  header?: TNavigationItemHeader;
  items: TNavigationItemDefault[];
  separator?: TNavigationItemSeparator;
};
