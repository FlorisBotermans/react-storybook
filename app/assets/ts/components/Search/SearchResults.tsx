import React, { FC } from 'react';
import SearchResultItem, { TSearchResultItemProps } from './SearchResultItem';
import HamburgerIcon from '../../../icons/hamburger.svg';

export type TResults = {
  loading: boolean;
  total: number;
  items: TSearchResultItemProps[];
}

type TProps = {
  results: TResults,
  totalText: string,
  loading: boolean;
  error: string;
}

const SearchResults: FC<TProps> = (props) => {
  const {
    loading,
    error,
    results,
    totalText = ''
  } = props;

  return (
    <>
      {(loading || error || results) && (
        <div className="search__results">
          {loading
            ? <HamburgerIcon className="search__results-loading" />
            : error
              ? <div className="search__results-error">{error}</div>
              : results && (
                <>
                  <div className="search__results-total">{results.total} {totalText}</div>
                  {results.items && results.items.length > 0 && (
                    <ul className="search__results-list">
                      {results.items.map(item => <SearchResultItem key={JSON.stringify(item)} {...item} />)}
                    </ul>
                  )}
                </>
              )
          }
        </div>
      )}
    </>
  );
};

export type TSearchResultsProps = TProps;
export default SearchResults;