import React, { FC, useRef, useState } from 'react';
import Grid from './Grid';
import Form, { TFieldProps } from './Form';
import { FormSubmittedHandler, FormSubmitHandler, FormErrorHandler } from '@truelime/react-forms';
import Section, { LogoBackground, LogoPosition } from './Containers/Section';
import HorizontalScrollbar from '../blocks/HorizontalScrollbar';
import { TItemProps } from '../typings/blocks';
import ScrollButton from '../blocks/ScrollButton';
import { Scrollbar } from 'smooth-scrollbar/scrollbar';
import HamburgerIcon from '../../icons/hamburger.svg';
import { ScrollButtonDirection, ScrollButtonPosition } from '../blocks/ScrollButton/typings';

type IdentifiedBlocksProps = TItemProps & {
  id: number;
};

type TProps = {
  title: string;
  actionIsResultsUrl: boolean;
  action: string;
  submitErrorMessage: string;
  fields: TFieldProps[];
  items: IdentifiedBlocksProps[];
};

const OverviewSection: FC<TProps> = (props) => {
  const {
    title,
    fields,
    action,
    actionIsResultsUrl,
    submitErrorMessage
  } = props;

  const scrollbarRef = useRef<Scrollbar>(null);

  const [results, setResults] = useState<number[]>(undefined);
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

  const items: TItemProps[] = props.items
    .filter(({ id }) =>
      !results || results.includes(id)
    )
    .map(({ id, ...props }) => props); // eslint-disable-line @typescript-eslint/no-unused-vars

  return (
    <Section className="overview-section" logo={{ position: LogoPosition.OneThird, background: LogoBackground.Accent1Tint3 }}>
      <div className="overview-section__filter theme-dark">
        <h1 className="overview-section__filter-title">{title}</h1>
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
      {loading
        ? <HamburgerIcon className="overview-section__loading" />
        : hasError
          ? <div className="overview-section__error">{submitErrorMessage}</div>
          : (
              <HorizontalScrollbar className="overview-section__list-scroller" scrollbarRef={scrollbarRef} render={() => (
                <div className="overview-section__list-center">
                  <Grid items={items} />
                </div>
              )} />
            )
      }
      <ScrollButton scrollbarState={scrollbarRef} options={{ direction: ScrollButtonDirection.Left, position: ScrollButtonPosition.OneThird }} />
      <ScrollButton scrollbarState={scrollbarRef} options={{ direction: ScrollButtonDirection.Right, position: ScrollButtonPosition.Right }} />
    </Section>
  );
};

export type TOverviewSectionProps = TProps;
export default OverviewSection;