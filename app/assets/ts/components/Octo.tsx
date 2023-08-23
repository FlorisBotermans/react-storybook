import React, { FC, useEffect, useRef, useState } from 'react';

import { purifyInnerHTML } from '../utils/domPurify';

const clearExistingOctoScripts = () => {
  document.head.querySelectorAll('[data-requirecontext]').forEach(script => script.remove());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).define = undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).requirejs = undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).require = undefined;
};

type TProps = {
  html: string,
  vendorUrl: string
  scriptUrl: string
}

const Octo: FC<TProps> = (props) => {
  const {
    scriptUrl,
    vendorUrl,
    html
  } = props;

  const [renderScript, setRenderScript] = useState(true);
  const octoNode = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!vendorUrl && !scriptUrl && !html) return;
    if (!renderScript) return;

    clearExistingOctoScripts();

    const script = document.createElement('script');
    script.setAttribute('src', vendorUrl);
    script.setAttribute('data-main', scriptUrl);
    octoNode.current.appendChild(script);

    setRenderScript(false);
  }, [vendorUrl, scriptUrl, html, renderScript]);

  return (
    <div className="octo" ref={octoNode} dangerouslySetInnerHTML={purifyInnerHTML(props.html)} />
  );
};

export default Octo;
