import ContactGridBlock, { TContactGridBlockProps } from '../GridBlock/ContactGridBlock';
import React, { FC, useRef } from 'react';

import HorizontalScrollbar from '../../blocks/HorizontalScrollbar';
import Link from '../Link';
import LazySizes from '../../blocks/LazySizes';
import imageUrlsToLazySizesProps from '../../utils/imageUrlsToLazySizesProps';

type TProps = {
  title: string;
  intro: string;
  imageUrls: string[];
  linkText: string;
  linkUrl: string;
  contact: TContactGridBlockProps[];
};

const SchoolInfo: FC<TProps> = (props) => {
  const {
    title = '',
    imageUrls = [],
    intro,
    linkText,
    linkUrl,
    contact = []
  } = props;

  const scrollerRef = useRef(null);

  return (
    <div className="school-info">
      <LazySizes.div className="school-info__header" {...imageUrlsToLazySizesProps(imageUrls, 'Header')}>
        <h2 className="school-info__header-title">{title}</h2>
      </LazySizes.div>
      <HorizontalScrollbar scrollbarRef={scrollerRef} render={() => (
        <div className="school-info__content">
          <ul className="school-info__list">
            <li className="school-info__list-item">
              <div className="school-info__text-block">
                <p>{intro}</p>
                <span>
                  <Link linkText={linkText} linkUrl={linkUrl} options={{ bordered: true, small: true }} />
                </span>
              </div>
            </li>
            {contact.map(contactProps =>
              <li key={JSON.stringify(contactProps)} className="school-info__list-item">
                <ContactGridBlock {...contactProps} />
              </li>
            )}
          </ul>
        </div>
      )} />
    </div>
  );
};

export default SchoolInfo;
export type TSchoolInfoProps = TProps;
