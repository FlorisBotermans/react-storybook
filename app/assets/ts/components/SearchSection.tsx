import React, { FC } from 'react';
import Search from './Search';
import { TSearchProps } from './Search/typings';
import Section, { LogoPosition, LogoBackground } from './Containers/Section';

const SearchSection: FC<TSearchProps> = (props) => {
  return (
    <Section
      className="search-section"
      logo={{
        position: LogoPosition.Center,
        background: LogoBackground.White
      }}>
      <Search {...props} actionIsResultsUrl={false} />
    </Section>
  );
};

export type TSearchSectionProps = TSearchProps;
export default SearchSection;