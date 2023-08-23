import React, { FC } from 'react';
import { TTooltipProps } from './typings';
import Tippy from '@tippyjs/react';
import { purifyInnerHTML } from '../../utils/domPurify';
import InfoIcon from '../../../icons/info.svg';
import canUseDOM from '../../utils/serverSide/canUseDOM';

const Tooltip: FC<TTooltipProps> = ({ text, children, showIcon = true }) => {
  return (
    <Tippy
      className="tooltip__overlay"
      content={<div dangerouslySetInnerHTML={purifyInnerHTML(text)} />}
      trigger="click"
      placement="top"
      interactive={true}
      appendTo={canUseDOM ? document.body : null}
    >
      <button className="tooltip__btn" onClick={(e) => e.stopPropagation()}>
        {children}
        {showIcon && (
          <InfoIcon className="tooltip__icon" title="Info" />
        )}
      </button>
    </Tippy>
  );
};

export default Tooltip;
