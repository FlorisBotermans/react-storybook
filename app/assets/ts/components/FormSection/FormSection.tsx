import React, { FC } from 'react';
import { Form } from '@truelime/react-forms';
import ContentSectionContainer from '../Containers/ContentSectionContainer';
import CustomTemplates from '../Form/templates';
import { TFormSectionProps } from './typings';

const FormSection: FC<TFormSectionProps> = (props) => {
  const {
    id
  } = props;

  return (
    <ContentSectionContainer id={id}>
      <Form
        config={props}
        templates={CustomTemplates}
      />
    </ContentSectionContainer>
  );
};

export default FormSection;
