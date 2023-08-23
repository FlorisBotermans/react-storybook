import React, { FunctionComponent } from 'react';
import GridBlock from './GridBlock';
import ContactInfo from '../ContactInfo';

type TProps = {
  type: string;
  title: string;
  labels: string[];
  imageUrls: string[];
  linkUrl: string;
  linkText: string;
};

const ContactGridBlock: FunctionComponent<TProps> = (props) => {
  const {
    type = '',
    title = '',
    linkUrl = '',
    linkText = '',
    labels = [],
    imageUrls = []
  } = props;
  return (
    <GridBlock type={type} imageUrls={imageUrls} className="contact-grid-block">
      <ContactInfo title={title} linkText={linkText} linkUrl={linkUrl} labels={labels} />
    </GridBlock>
  );
};

export type TContactGridBlockProps = TProps;
export default ContactGridBlock;
