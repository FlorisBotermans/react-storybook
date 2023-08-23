import React, { FC, MouseEventHandler } from 'react';
import classNames from 'classnames';
import { purifyInnerHTML } from '../utils/domPurify';
import { getOptionalAnchorProps } from '../utils/anchorHelper';

type TProps = {
  linkText: string;
  linkUrl?: string;
  className?: string;
  onClick?: MouseEventHandler;
  isActive?: boolean;
  options?: TOptions;
}
type TOptions = {
  bordered?: boolean;
  small?: boolean;
  icon?: boolean;
  margin?: boolean;
};
const defaultOptions: TOptions = {
  bordered: false,
  small: false,
  icon: true,
  margin: false
};

const Link: FC<TProps> = ({ linkText, linkUrl, className, onClick, isActive, options = defaultOptions }) => {
  const linkClass = classNames('btn', className, {
    'btn--bordered': options.bordered || false,
    'btn--small': options.small || false,
    'btn--icon': options.icon || true,
    'btn--margin': options.margin || false,
    'btn--active': !!isActive
  });

  if (linkUrl) {
    return (
      <a href={linkUrl} className={linkClass} {...getOptionalAnchorProps(linkUrl)} onClick={onClick} dangerouslySetInnerHTML={purifyInnerHTML(linkText)} />
    );
  } else if (onClick) {
    return (
      <button className={linkClass} onClick={onClick} dangerouslySetInnerHTML={purifyInnerHTML(linkText)} />
    );
  }
  return (
    <span className={linkClass} dangerouslySetInnerHTML={purifyInnerHTML(linkText)} />
  );
};

export type TLinkProps = TProps;
export default Link;
