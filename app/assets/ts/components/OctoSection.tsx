import React, { FC } from 'react';

import Octo from './Octo';
import Section from './Containers/Section';

type TProps = {
  id?: string;
  html: string,
  vendorUrl: string
  scriptUrl: string,
  renderAside: boolean
}

const OctoSection: FC<TProps> = (props) => {
  const {
    id,
    html = '',
    vendorUrl = '',
    scriptUrl = ''
  } = props;

  return (
    <Section id={id} className="octo-section">
      <div className="container container--center-wide container--margin">
        <Octo html={html} vendorUrl={vendorUrl} scriptUrl={scriptUrl} />
      </div>
    </Section>
  );
};

export default OctoSection;
