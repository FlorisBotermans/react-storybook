import React, { FC } from 'react';
import { purifyInnerHTML } from '../utils/domPurify';

type Kenmerk = {
  label: string;
  text: string;
};
type KenmerkenSectionViewModel = {
  id?: string;
  kenmerken: Kenmerk[];
};

const KenmerkenSection: FC<KenmerkenSectionViewModel> = ({ id, kenmerken = [] }) => {
  if (kenmerken.length === 0) return null;
  return (
    <section id={id} className="kenmerken-section">
      <dl className="kenmerken-section__container">
        {kenmerken.map(({ label = '', text = '' }) =>
          <div key={label} className="kenmerk-item">
            <dt className="kenmerk-item__label" dangerouslySetInnerHTML={purifyInnerHTML(label)} />
            <dd className="kenmerk-item__text" dangerouslySetInnerHTML={purifyInnerHTML(text)} />
          </div>
        )}
      </dl>
    </section>
  );
};

export type TKenmerkenSectionProps = KenmerkenSectionViewModel;
export default KenmerkenSection;
