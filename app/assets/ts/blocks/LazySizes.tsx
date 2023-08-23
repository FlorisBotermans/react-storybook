import React, { FunctionComponent, useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import { clientSideOnly, useIsomorphicLayoutEffect } from '../utils/serverSide/rendering';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lazySizes: any;
    lazySizesConfig: {
      init: boolean;
    }
  }
}

clientSideOnly(async () => {
  window.lazySizesConfig = window.lazySizesConfig || { init: false };
  window.lazySizesConfig.init = false;

  // import async from client script chunk to prevent server-side rendering exceptions
  await import(/* webpackChunkName: "client" */ 'lazysizes');
  await import(/* webpackChunkName: "client" */ 'lazysizes/plugins/respimg/ls.respimg.js');
  await import(/* webpackChunkName: "client" */ 'lazysizes/plugins/bgset/ls.bgset.js');
  await import(/* webpackChunkName: "client" */ 'lazysizes/plugins/print/ls.print.js');
});

const load = () => window.lazySizes.init();

const placeholderSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

type TLazySizesProps = {
  src?: string;
  srcSet?: string;
  sizes?: string;
  mobile?: {
    src?: string;
    srcSet: string;
    sizes: string;
  }
}

type TLazySizesImgProps = TLazySizesProps & {
  alt?: string;
  width?: number;
  height?: number;
}

const LazySizesImg: FunctionComponent<TLazySizesImgProps & React.HTMLAttributes<HTMLImageElement>> = (props) => {
  let {
    alt = '',
    className,
    src,
    srcSet,
    sizes = 'auto',
    width,
    height,
    mobile,
    ...innerProps
  } = props;

  const imgRef = useRef<HTMLImageElement>(null);
  const [isMobile, setIsMobile] = useState(getIsMobile());
  const handleResize = () => {
    const newIsMobile = getIsMobile();
    if (newIsMobile === isMobile) return;

    setIsMobile(newIsMobile);
  };
  useIsomorphicLayoutEffect(() => {
    if (!mobile) return;
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  // After every isMobile change force lazyload to recheck the current image
  useEffect(() => {
    if (!mobile) return;

    imgRef.current.classList.add('lazyload');
  }, [isMobile, mobile]);

  className = classNames(className, 'lazyload');
  sizes = (width && height) ? null : (
    (isMobile && mobile) ? mobile.sizes : sizes
  );
  srcSet = (isMobile && mobile)
    ? (mobile.src || mobile.srcSet)
    : (src || srcSet);
  src = src || (srcSet) ? srcSet.split(',')[0].split(' ')[0] : '';

  return (
    <img
      ref={imgRef}
      {...innerProps}
      alt={alt}
      className={className}
      data-sizes={sizes}
      src={placeholderSrc}
      data-src={src}
      data-srcset={srcSet}
      width={width}
      height={height} />
  );
};

const getIsMobile = () => window.innerWidth < 768;

type TLazySizesBgProps = TLazySizesProps & {
  tag: 'span' | 'div' | 'a';
}

const LazySizesBg: FunctionComponent<TLazySizesBgProps & React.HTMLAttributes<HTMLElement>> = (props) => {
  let {
    tag: Tag,
    className,
    children,
    src,
    srcSet,
    sizes = 'auto',
    mobile,
    ...innerProps
  } = props;

  const tagRef = useRef(null);
  const [isMobile, setIsMobile] = useState(getIsMobile());

  sizes = (isMobile && mobile) ? mobile.sizes : sizes;
  srcSet = (isMobile && mobile)
    ? (mobile.src || mobile.srcSet)
    : (src || srcSet);
  let lazySizesAttributes = {};
  if (srcSet) {
    className = classNames(
      className,
      { lazyload: srcSet }
    );
    lazySizesAttributes = {
      'data-sizes': sizes,
      'data-bgset': srcSet
    };
  }

  const handleResize = () => {
    const newIsMobile = getIsMobile();
    if (newIsMobile === isMobile) return;

    setIsMobile(newIsMobile);
  };
  useIsomorphicLayoutEffect(() => {
    if (!srcSet || !mobile) return;

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  // After every isMobile change force lazyload to recheck the current image
  useEffect(() => {
    if (!srcSet || !mobile) return;

    (tagRef.current as HTMLElement).classList.add('lazyload');
  }, [srcSet, isMobile, mobile]);

  return (
    <Tag
      ref={tagRef}
      {...innerProps}
      className={className}
      {...lazySizesAttributes}>
      {children}
    </Tag>
  );
};

const LazySizesSpan: FunctionComponent<TLazySizesProps & React.HTMLAttributes<HTMLSpanElement>> = (props) => {
  const {
    children,
    ...innerProps
  } = props;

  return (
    <LazySizesBg {...innerProps} tag="span">
      {children}
    </LazySizesBg>
  );
};

const LazySizesDiv: FunctionComponent<TLazySizesProps & React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const {
    children,
    ...innerProps
  } = props;

  return (
    <LazySizesBg {...innerProps} tag="div">
      {children}
    </LazySizesBg>
  );
};

const LazySizesA: FunctionComponent<TLazySizesProps & React.AnchorHTMLAttributes<HTMLAnchorElement>> = (props) => {
  const {
    children,
    ...innerProps
  } = props;

  return (
    <LazySizesBg {...innerProps} tag="a">
      {children}
    </LazySizesBg>
  );
};

export default {
  load,
  img: LazySizesImg,
  span: LazySizesSpan,
  div: LazySizesDiv,
  a: LazySizesA
};
