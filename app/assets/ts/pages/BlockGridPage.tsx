import React, { FC } from 'react';

import PageHeader, { TPageHeaderProps } from './header/PageHeader';

import BlockGridSection from '../components/BlockGridSection';
import { TBlockGridSectionProps } from '../components/BlockGridSection/typings';

import CookieNotification, { TCookieNotificationProps } from '../components/CookieNotification';

type TBlockGridPageProps = {
  pageHeaderProps: TPageHeaderProps;
  blockGridSectionProps: TBlockGridSectionProps;
  cookieNotificationProps: TCookieNotificationProps;
}

const BlockGridPage: FC<TBlockGridPageProps> = (props) => {
  const {
    pageHeaderProps,
    blockGridSectionProps,
    cookieNotificationProps
  } = props;

  return (
    <>
      <PageHeader {...pageHeaderProps} />
      <BlockGridSection {...blockGridSectionProps} />
      <CookieNotification {...cookieNotificationProps} />
    </>
  );
};

export default BlockGridPage;