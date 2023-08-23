import React, { FC } from 'react';
import Accordion from './Accordion';
import ContentSectionContainer from '../Containers/ContentSectionContainer';
import { purifyInnerHTML } from '../../utils/domPurify';
import { TAccordionSectionProps } from './types';

const AccordionSection: FC<TAccordionSectionProps> = ({ id, title, intro, items = [] }) => {
  return (
    <ContentSectionContainer id={id}>
      <div className="accordion-section">
        <h3>{title}</h3>
        <div dangerouslySetInnerHTML={purifyInnerHTML(intro)} />
        {items.length > 0 &&
          <ul className="accordion-section__group">
            {items.map(accordionProps =>
              <li key={accordionProps.title}>
                <Accordion {...accordionProps} />
              </li>
            )}
          </ul>
        }
      </div>
    </ContentSectionContainer>
  );
};

export default AccordionSection;
