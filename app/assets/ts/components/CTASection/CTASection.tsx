import React, { FC } from 'react';
import classNames from 'classnames';
import CTA from './CTA';
import Link from '../Link';
import { TCTASectionProps } from './typings';
import Section, { LogoPosition, LogoBackground } from '../Containers/Section';

const CTASection: FC<TCTASectionProps> = ({ id, banner = null, blocks = [] }) => {
  return (
    <Section
      id={id}
      className="cta-section theme-dark"
      logo={{
        position: LogoPosition.OneThird,
        background: LogoBackground.Accent1Tint3
      }}>
      {banner && banner.linkText && banner.linkUrl &&
        <div className="cta-section__banner">
          <Link linkText={banner.linkText} linkUrl={banner.linkUrl} />
        </div>
      }
      {blocks.length > 0 &&
        <ul className="cta-section__blocks">
          {blocks.slice(0, 3)
            .map((block, index) => (
              <li key={block.linkText} className="cta-section__block">
                <CTA {...block} imageUrlsStyle={index === 2 ? 'CTALarge' : 'CTA'} className={classNames('cta-section__block-item', { 'cta--large': index === 2 })} />
              </li>
            ))}
        </ul>
      }
    </Section>
  );
};

export default CTASection;
