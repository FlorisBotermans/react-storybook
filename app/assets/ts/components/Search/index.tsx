import React, { FC, useState } from 'react';
import SearchResults, { TResults } from './SearchResults';
import Form from '../Form';
import { FormSubmittedHandler, FormErrorHandler, FormSubmitHandler } from '@truelime/react-forms';
import { TSearchProps } from './typings';
import { useIsomorphicLayoutEffect } from '../../utils/serverSide/rendering';
import classNames from 'classnames';
import { getThemeClass } from '../../utils/theme';

const Search: FC<TSearchProps> = (props) => {
  const {
    accent,
    title,
    noHeader = false,
    action,
    actionIsResultsUrl,
    submitErrorMessage,
    resultsTotalText,
    onLayout
  } = props;
  const fields = props.fields.map(field => ({
    ...field,
    isRequired: field.type === 'searchtext'
  }));
  const [results, setResults] = useState<TResults>();
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleChange: () => void = () => {
    setResults(undefined);
  };

  const handleSubmit: FormSubmitHandler = async () => {
    setLoading(true);
    setHasError(false);
    setResults(undefined);
  };
  const handleSubmitted: FormSubmittedHandler = async (response) => {
    setResults(response.data);
    setHasError(false);
    setLoading(false);
  };
  const handleError: FormErrorHandler = async () => {
    setResults(undefined);
    setHasError(true);
    setLoading(false);
  };
  useIsomorphicLayoutEffect(() => {
    if (onLayout) onLayout();
  });

  return (
    <div className="search">
      <div className="search__form">
        <div className={classNames('search__form-container', getThemeClass(accent))}>
          {title && (noHeader
            ? <div className="h2">{title}</div>
            : <h1 className="h2">{title}</h1>
          )}
          <Form
            name="search-form"
            fields={fields}
            action={action}
            actionIsResultsUrl={actionIsResultsUrl}
            submitErrorMessage={submitErrorMessage}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onSubmitted={handleSubmitted}
            onError={handleError}
          />
        </div>
      </div>
      <SearchResults
        error={hasError && submitErrorMessage}
        loading={loading}
        results={results}
        totalText={resultsTotalText} />
    </div>
  );
};

export default Search;
