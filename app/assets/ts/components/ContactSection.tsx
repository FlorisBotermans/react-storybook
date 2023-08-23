import React, { FC } from 'react';

import { purifyInnerHTML } from '../utils/domPurify';
import LinkBlock, { TLinkBlockProps } from './LinkBlock';
import Link from './Link';
import Section, { LogoPosition, LogoBackground } from './Containers/Section';

type TProps = {
  id?: string;
  text: string;
  linkText: string;
  linkUrl: string;
  columns: TLinkBlockProps[];
}

const ContactSection: FC<TProps> = (props) => {
  const {
    id,
    text = '',
    linkText,
    linkUrl,
    columns = []
  } = props;

  return (
    <Section
      id={id}
      className="contact-section theme-dark"
      logo={{
        position: LogoPosition.OneThird,
        background: LogoBackground.Accent1Tint1
      }}>
      <div className="contact-section__content">
        <div dangerouslySetInnerHTML={purifyInnerHTML(text)} />
        {linkUrl && linkText &&
          <Link className="contact-section__content-link" linkText={linkText} linkUrl={linkUrl} />
        }
      </div>
      <div className="contact-section__navigation contact-section__navigation--sticky">
        {columns
          .slice(0, 2)
          .map(columnProps => <LinkBlock
            key={columnProps.title}
            className="contact-section__navigation-item"
            {...columnProps} />
          )}
      </div>
    </Section>
  );
};

export type TContactSectionProps = TProps;
export default ContactSection;
