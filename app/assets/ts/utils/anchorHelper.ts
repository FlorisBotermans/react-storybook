import { AnchorHTMLAttributes } from 'react';

type TOptionalAnchorPropsOptions = {
  download?: boolean;
}

const host = globalThis?.location?.host;
const protocols = ['http://', 'https://', '//'];
const isOtherOriginUrl = (url = ''): boolean => (
  protocols.some(protocol => url?.startsWith(protocol)) &&
  !protocols.some(protocol => url?.startsWith(`${protocol}${host}`))
);

export const getOptionalAnchorProps = (url: string, options?: TOptionalAnchorPropsOptions): AnchorHTMLAttributes<HTMLAnchorElement> => {
  const optionalProps: AnchorHTMLAttributes<HTMLAnchorElement> = {};
  if (isOtherOriginUrl(url)) {
    optionalProps.target = '_blank';
    optionalProps.rel = 'noopener noreferrer';
  }
  if (options?.download) {
    optionalProps.download = true;
  }
  return optionalProps;
};