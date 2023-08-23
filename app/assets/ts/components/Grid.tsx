import React, { FC } from 'react';
import classNames from 'classnames';
import { TItemProps } from '../typings/blocks';
import BlockList from '../blocks/BlockList';

type TProps = {
  items: TItemProps[];
  className?: string;
};

const Grid: FC<TGridProps> = ({ className, items }) => {
  const gridClassName = classNames('grid', className);
  return (
    <div className={gridClassName}>
      <BlockList items={items} />
    </div>
  );
};

export type TGridProps = TProps;
export default Grid;
