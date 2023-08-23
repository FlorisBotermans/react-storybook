import React, { FC } from 'react';
import classNames from 'classnames';
import Section, { LogoState } from './Section';

interface ContentSectionContainerViewModel {
  id?: string,
  className?: string;
  logo?: LogoState;
}

const ContentSectionContainer: FC<ContentSectionContainerViewModel> = ({ children, id, className, logo }) => {
  const contentClassName = classNames(
    'container container--center-wide container--margin-bottom',
    className
  );

  return (
    <Section id={id} className={contentClassName} logo={logo}>
      {children}
    </Section>
  );
};

export default ContentSectionContainer;
