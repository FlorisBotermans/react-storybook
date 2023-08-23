import React, { FC } from 'react';

import PageHeader, { TPageHeaderProps } from './header/PageHeader';

import Header from '../components/Header';
import { THeaderProps } from '../components/Header/typings';

import SearchSection, { TSearchSectionProps } from '../components/SearchSection';

import CookieNotification, { TCookieNotificationProps } from '../components/CookieNotification';

type TSearchResultsPageProps = {
  pageHeaderProps: TPageHeaderProps;
  headerProps: THeaderProps;
  searchSectionProps: TSearchSectionProps;
  cookieNotificationProps: TCookieNotificationProps;
}

const SearchResultsPage: FC<TSearchResultsPageProps> = (props) => {
  const {
    pageHeaderProps,
    headerProps,
    searchSectionProps,
    cookieNotificationProps
  } = props;

  return (
    <>
      <PageHeader {...pageHeaderProps} />
      <Header {...headerProps} />
      <SearchSection {...searchSectionProps} />
      <CookieNotification {...cookieNotificationProps} />
    </>
  );
};

export default SearchResultsPage;