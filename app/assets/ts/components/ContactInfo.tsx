import React, { FC } from 'react';
import Link from './Link';

type TProps = {
  title: string;
  labels: string[];
  linkUrl: string;
  linkText: string;
};

const ContactInfo: FC<TProps> = ({ title, labels, linkUrl, linkText }) => (
  <span className="contact-info">
    <span className="contact-info__title">{title}</span>
    <span className="contact-info__content">
      {labels.length > 0 &&
        <ul className="list list--reset">
          {labels.map(label => <li key={label}>{label}</li>)}
        </ul>
      }
      {(linkUrl && linkText) && (
        <Link
          linkUrl={linkUrl}
          linkText={linkText}
          options={{
            bordered: true,
            icon: true
          }}
        />
      )}
    </span>
  </span>
);

export type TContactInfoProps = TProps;
export default ContactInfo;
