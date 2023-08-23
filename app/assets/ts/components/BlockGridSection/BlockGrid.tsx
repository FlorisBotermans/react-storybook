import React, { FC } from 'react';
import classNames from 'classnames';

import { GridSectionItem, GridSectionTheme } from './typings';
import { TItemProps } from '../../typings/blocks';
import BlockList from '../../blocks/BlockList';
import Link from '../Link';

const BlockGrid: FC<GridSectionItem> = (props) => {
  if (!props) return null;
  const items = (props.items as TItemProps[]).map(item => item);
  const blockGridClass = classNames('block-grid', {
    'block-grid--theme-primary': GridSectionTheme.Primary === props.theme,
    'block-grid--theme-secondary': GridSectionTheme.Secondary === props.theme
  });
  return (
    <div className={blockGridClass}>
      <div className="container container--margin container--center-wide">
        <div className="block-grid__items">
          <BlockList items={items} />
        </div>
        {props && props.linkText && props.linkUrl &&
          <Link linkText={props.linkText} className="block-grid__link" linkUrl={props.linkUrl} />
        }
      </div>
    </div>
  );
};

export default BlockGrid;
