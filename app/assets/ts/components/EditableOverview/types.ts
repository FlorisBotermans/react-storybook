export type TItemProps = {
  id: object;
  index: number;
  title: string;
  url?: string;
  icon?: string;
  description?: string;
  categories?: string[];
  groups?: string[];
  supportLink?: string;
  supportLinkText?: string;
};

export type TGroupProps = {
  title: string;
  items: TItemProps[];
}

export type TEditableOverviewProps = {
  url: string;
  networkErrorMessage: string;
  emptyMessage: string;
  addUrl: string;
  addText: string;
  availableOverview: TAvailableOverviewProps;
  deleteUrl: string;
  orderUrl: string;
};

export type TEditableOverviewItemProps = TItemProps & {
  deleteUrl: string;
  networkErrorMessage: string;
  deletedCallback: (id: object) => void;
}

export type TAvailableOverviewProps = {
  title: string;
  closeText: string;
  allText: string;
  addText: string;
  selectedItems: object[];
  search: {
    placeholderText: string;
    btnText: string;
  };
  url: string;
  networkErrorMessage: string;
  addNetworkErrorMessage: string;
  emptyMessage: string;
  addUrl: string;
  handleClosed: () => void;
  handleAdded: (item: TItemProps) => void;
}

export type TAvailableOverviewItemProps = TItemProps & {
  addText: string;
  addItem: (id: object) => void;
}

export type TAvailableOverviewGroupProps = TGroupProps & {
  addText: string;
  addItem: (id: object) => void;
}