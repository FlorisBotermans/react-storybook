import React, { FC } from 'react';

import Navigation from '../../components/Navigation';
import { TNavigationProps } from '../../components/Navigation/typings';

import TopNavigation from '../../components/TopNavigation';
import { TTopNavigationProps } from '../../components/TopNavigation/typings';

export type TPageHeaderProps = {
  navigationProps: TNavigationProps,
  topNavigationProps: TTopNavigationProps
}

const PageHeader: FC<TPageHeaderProps> = (props) => {
  const {
    navigationProps,
    topNavigationProps
  } = props;

  return (
    <>
      <Navigation {...navigationProps} />
      <TopNavigation {...topNavigationProps} />
    </>
  );
};

export default PageHeader;