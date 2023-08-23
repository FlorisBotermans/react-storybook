import React, { FC, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import useMeasure from 'react-use-measure';
import { ResizeObserver } from '@juggle/resize-observer';
import classNames from 'classnames';
import { purifyInnerHTML } from '../../utils/domPurify';
import CollapseIcon from '../../../icons/collapse.svg';
import { TAccordionProps } from './types';

const Accordion: FC<TAccordionProps> = ({ title = '', text = '' }) => {
  const [collapsed, set] = useState(false);
  const [ref, { height: viewHeight }] = useMeasure({ polyfill: ResizeObserver });
  const props = useSpring({ height: collapsed ? viewHeight : 0 });

  const accordionClass = classNames('accordion', {
    'accordion--collapsed': collapsed
  });

  return (
    <div className={accordionClass}>
      <button className="accordion__title" onClick={(): void => set(!collapsed)}>
        <span dangerouslySetInnerHTML={purifyInnerHTML(title)} />
        <CollapseIcon className="accordion__icon" />
      </button>
      <animated.div style={{ ...props, willChange: 'height', overflow: 'hidden' }}>
        <div className="accordion__content" ref={ref} dangerouslySetInnerHTML={purifyInnerHTML(text)} />
      </animated.div>
    </div>
  );
};

export default Accordion;
