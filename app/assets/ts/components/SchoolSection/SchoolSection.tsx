import React, { FC, MouseEventHandler, useState, useEffect, useCallback } from 'react';
import { useTransition, animated } from 'react-spring';

import slugify from '../../utils/slugify';
import Section, { LogoPosition, LogoBackground } from '../Containers/Section';
import SidebarNavigation, { SidebarPosition, SidebarContentPosition } from '../SidebarNavigation';
import ActualList from './ActualList';
import SchoolInfo, { TSchoolInfoProps } from './SchoolInfo';
import { TNewsGridBlockProps } from '../GridBlock/NewsGridBlock';
import { TEventGridBlockProps } from '../GridBlock/EventGridBlock';
import { LinkBlockList } from './LinkBlockList';
import { TLinkBlockProps } from '../LinkBlock';
import StoryList from './StoryList';
import { TContentGridBlockProps } from '../GridBlock/ContentGridBlock';

const OPLEIDINGEN = 'OPLEIDINGEN';
const WERKPLAATS = 'WERKPLAATS';
const ACTUALITEIT = 'ACTUALITEIT';
const VERHALEN = 'VERHALEN';
const INFO = 'INFO';

type TProps = {
  title: string;
  navigatie: {
    opleiding: string;
    werkplaatsen: string;
    actualiteit: string;
    info: string;
    verhalen: string;
  };
  info: TSchoolInfoProps;
  opleidingen: TLinkBlockProps[];
  werkplaatsen: TLinkBlockProps[];
  evenementen: TEventGridBlockProps[];
  nieuws: TNewsGridBlockProps[];
  verhalen: TContentGridBlockProps[];
  links: {
    linkUrl: string,
    linkText: string
  }[];
};

const SchoolSection: FC<TProps> = (props) => {
  const {
    title = '',
    navigatie,
    info,
    opleidingen,
    werkplaatsen,
    evenementen,
    nieuws,
    verhalen,
    links
  } = props;

  const [location, setLocation] = useState<string>(null);
  const transitions = useTransition(location, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  // Handle location link click
  const handleClickEvent: MouseEventHandler = (event) => {
    event.preventDefault();
    const htmlButtonElement = event.target as HTMLButtonElement;
    const hash = `#${slugify(htmlButtonElement.innerText)}`;
    history.replaceState(null, null, hash);
    updateState();
  };

  const generateLinksHelper = (links: string[]) => {
    // TODO: Setting linkUrl so that the button has the correct active styling. Maybe refactor this later, so that Link component has a better way of becomign an active element!
    return links.map(linkTitle => ({ linkText: linkTitle, clickEvent: handleClickEvent, hash: `#${slugify(linkTitle)}`, linkUrl: `#${slugify(linkTitle)}` }));
  };

  const listLinks = generateLinksHelper([
    navigatie.opleiding,
    navigatie.werkplaatsen,
    navigatie.actualiteit,
    navigatie.verhalen,
    navigatie.info
  ]);
  const locationMap = useCallback(() => new Map([
    [OPLEIDINGEN, listLinks[0].hash],
    [WERKPLAATS, listLinks[1].hash],
    [ACTUALITEIT, listLinks[2].hash],
    [VERHALEN, listLinks[3].hash],
    [INFO, listLinks[4].hash]
  ]), [listLinks]);
  const lists = [
    opleidingen,
    werkplaatsen,
    [...evenementen, ...nieuws],
    verhalen
  ];
  const defaultLocation = listLinks[0].hash;

  const sidebarLinks = [
    ...listLinks.filter((_link, i) => !lists[i] || lists[i].length > 0),
    ...links
  ];

  const updateState = useCallback(() => {
    const locationEntry = [...locationMap().entries()].find(entry => entry[1] === window.location.hash);
    const newLocation = locationEntry ? locationEntry[1] : defaultLocation;
    if (location !== newLocation) {
      setLocation(newLocation);
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }, [locationMap, defaultLocation, location]);

  // Set the current hash to render the corresponding component
  useEffect(() => updateState(), [updateState]);

  // Handle browser navigation to render the corresponding component
  useEffect(() => {
    window.addEventListener('popstate', updateState);
    return () => window.removeEventListener('popstate', updateState);
  }, [updateState]);

  // Handle browser resize for toggling navigation and setting hash location
  useEffect(() => {
    window.addEventListener('resize', updateState);
    return () => window.removeEventListener('resize', updateState);
  }, [updateState]);

  return (
    <Section
      className="school-section"
      logo={{
        position: LogoPosition.OneThird,
        background: LogoBackground.Accent1Tint3
      }}>
      {
        <div className="school-section__navigation">
          <SidebarNavigation
            title={title}
            links={sidebarLinks}
            location={location}
            options={{
              compact: false,
              position: SidebarPosition.Left,
              contentPosition: SidebarContentPosition.Center,
              renderHeadline: true
            }}
          />
        </div>
      }
      <div className="school-section__content-wrapper">
        {transitions.map(({ item, key, props }) => {
          return (
            <animated.div key={key} style={props} className="school-section__content">
              {locationMap().get(OPLEIDINGEN) === item && <LinkBlockList list={opleidingen} />}
              {locationMap().get(WERKPLAATS) === item && <LinkBlockList list={werkplaatsen} />}
              {locationMap().get(ACTUALITEIT) === item && <ActualList evenementen={evenementen} nieuws={nieuws} />}
              {locationMap().get(VERHALEN) === item && <StoryList verhalen={verhalen} /> }
              {locationMap().get(INFO) === item && <SchoolInfo {...info} />}
            </animated.div>
          );
        })}
      </div>
    </Section>
  );
};

export default SchoolSection;
export type TSchoolSectionProps = TProps;
