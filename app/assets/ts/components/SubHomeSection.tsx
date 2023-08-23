import React, { FC } from 'react';
import classNames from 'classnames';
import { purifyInnerHTML } from '../utils/domPurify';
import Section, { LogoPosition, LogoBackground } from './Containers/Section';
import Exposition from './Exposition';
import SidebarNavigation, { SidebarContentPosition, SidebarPosition } from './SidebarNavigation';

type SubHomeBlocksViewModel = {
  linkTitle: string;
  linkUrl: string;
  subTitle: string;
  imageUrls: string[];
};
type SubHomeNavigationViewModel = {
  linkUrl: string;
  linkText: string;
};
type SubHomeSectionViewModel = {
  title: string;
  intro: string;
  navBlocks: SubHomeBlocksViewModel[];
  navTitle?: string;
  navLinks: SubHomeNavigationViewModel[];
};

const SubHomeSection: FC<SubHomeSectionViewModel> = (props) => {
  const {
    title = '',
    intro = '',
    navTitle,
    navLinks = [],
    navBlocks = []
  } = props;
  const sectionClass = classNames('subhome-section', {
    'subhome-section--no-nav': navLinks.length === 0
  });
  const sidebarNavigationOptions = {
    compact: true,
    position: SidebarPosition.Right,
    contentPosition: SidebarContentPosition.Top,
    renderHeadline: false,
    className: 'subhome-section__nav'
  };

  return (
    <Section
      className={sectionClass}
      logo={{
        position: LogoPosition.OneThird,
        background: LogoBackground.White
      }}>
      {navLinks.length > 0 &&
        <SidebarNavigation
          title={navTitle}
          links={navLinks}
          options={sidebarNavigationOptions}
        />
      }
      <div className="subhome-section__intro">
        <h1 className="subhome-section__intro-title" dangerouslySetInnerHTML={purifyInnerHTML(title)} />
        <div dangerouslySetInnerHTML={purifyInnerHTML(intro)} />
      </div>
      <div className="subhome-section__blocks">
        {navBlocks.map(navBlock =>
          <Exposition
            key={JSON.stringify(navBlock)}
            title={navBlock.linkTitle}
            subTitle={navBlock.subTitle}
            linkUrl={navBlock.linkUrl}
            imageUrls={navBlock.imageUrls}
            options={{ showIcon: true, className: 'subhome-section__blocks-item' }}
          />
        )}
      </div>
    </Section>
  );
};

export type TSubHomeSectionProps = SubHomeSectionViewModel;
export default SubHomeSection;
