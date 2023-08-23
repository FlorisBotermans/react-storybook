import React, { FC } from 'react';

import GlobalIcon from '../../../icons/global.svg';
import { TLanguageSwitchProps } from './typings';

const LanguageSwitch: FC<TLanguageSwitchProps> = ({ text, url }) => {
  if (!text || !url) return null;

  return (
    <a className="language-switch" href={url}>
      {text.toUpperCase()}
      <GlobalIcon className="language-switch__icon" />
    </a>
  );
};

export default LanguageSwitch;
