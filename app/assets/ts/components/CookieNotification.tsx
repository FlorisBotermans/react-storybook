import React, { FC, useState, useRef } from 'react';
import Cookies from 'js-cookie';
import { purifyInnerHTML } from '../utils/domPurify';
import { useIsomorphicLayoutEffect } from '../utils/serverSide/rendering';

const cookieName = 'CMSCookieLevel';

type TProps = {
  title: string;
  explanation: string;
  acceptText: string;
  rejectText: string;
  levels: {
    neutral: number;
    accepted: number;
    rejected: number;
  }
};

const CookieNotification: FC<TProps> = ({
  title,
  explanation,
  acceptText,
  rejectText,
  levels
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(true);
  useIsomorphicLayoutEffect(() => {
    const level = Cookies.get(cookieName) || levels?.neutral;
    const newHidden = level !== levels?.neutral;
    if (newHidden === hidden) return;

    setHidden(newHidden);
  }, [levels, hidden, setHidden]);

  if (hidden) return null;

  const fadeOut = () => {
    const elem = ref.current;
    elem.classList.add('cookie-notification--fade-out');
    elem.addEventListener('animationend', () => {
      setHidden(true);
    });
  };

  const accept = () => {
    Cookies.set(cookieName, levels?.accepted.toString());
    fadeOut();
  };
  const reject = () => {
    Cookies.set(cookieName, levels?.rejected.toString());
    fadeOut();
  };

  return (
    <div className="cookie-notification theme-dark" ref={ref}>
      <div className="cookie-notification__container">
        <div className="cookie-notification__row">
          <div className="cookie-notification__info">
            <h2 className="cookie-notification__title">{title}</h2>
            <div className="cookie-notification__explanation" dangerouslySetInnerHTML={purifyInnerHTML(explanation)} />
          </div>
          <div className="cookie-notification__btns">
            <button className="cookie-notification__btn" onClick={accept}>
              {acceptText}
            </button>
            <button className="cookie-notification__btn cookie-notification__btn--reject" onClick={reject}>
              {rejectText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export type TCookieNotificationProps = TProps;
export default CookieNotification;