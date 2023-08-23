import React, { FC } from 'react';

import PageHeader, { TPageHeaderProps } from './header/PageHeader';

import FormSection from '../components/FormSection';
import { TFormSectionProps } from '../components/FormSection/typings';

import CookieNotification, { TCookieNotificationProps } from '../components/CookieNotification';

type TFormulierenPageProps = {
  pageHeaderProps: TPageHeaderProps;
  formSectionProps: TFormSectionProps;
  cookieNotificationProps: TCookieNotificationProps;
}

const FormulierenPage: FC<TFormulierenPageProps> = (props) => {
  const {
    pageHeaderProps,
    formSectionProps,
    cookieNotificationProps
  } = props;

  return (
    <>
      <PageHeader {...pageHeaderProps} />
      <FormSection {...formSectionProps} />
      <CookieNotification {...cookieNotificationProps} />
    </>
  );
};

export default FormulierenPage;