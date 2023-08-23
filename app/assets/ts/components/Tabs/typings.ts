export type TTabsProps = {
  items: TTabItem[];
}

export type TTabItem = {
  url: string;
  title: string;
  active?: boolean;
}