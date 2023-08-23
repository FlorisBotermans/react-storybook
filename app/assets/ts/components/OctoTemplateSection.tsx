import React, { FC } from 'react';

import Octo from './Octo';
import Section from './Containers/Section';
import { purifyInnerHTML } from '../utils/domPurify';

type TProps = {
  id?: string;
  text?: string;
  filter: string;
  overview: string;
  vendorUrl: string
  scriptUrl: string
}

const OctoTemplateSection: FC<TProps> = (props) => {
  const {
    id,
    text = '',
    filter = '',
    overview = '',
    vendorUrl = '',
    scriptUrl = ''
  } = props;

  return (
    <Section id={id} className="octo-template-section">
      <div className="container container--center container--margin">
        <div className="octo-template-section__content">
          {filter &&
            <div className="octo-template-section__content-left">
              <Octo html={filter} vendorUrl={vendorUrl} scriptUrl={scriptUrl} />
            </div>
          }
          <div className="octo-template-section__content-right">
            {text && <div dangerouslySetInnerHTML={purifyInnerHTML(text)} />}
            {overview && <Octo html={overview} vendorUrl={vendorUrl} scriptUrl={scriptUrl} />}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default OctoTemplateSection;
