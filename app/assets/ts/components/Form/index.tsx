import React, { FC } from 'react';
import { Form as TLForm, FormSubmittedHandler, FormChangeHandler, FormSubmitHandler, FormErrorHandler, FormCancelledHandler } from '@truelime/react-forms';
import BaseTemplates from '../Form/templates';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/'
});

const parsePropsToFormConfig = (props: TProps): any => ({ // eslint-disable-line
  title: '',
  intro: '',
  remark: '',
  steps: [
    {
      name: props.name,
      parts: (props.fields || []).map(fieldProps => parsePropsToFieldConfig(fieldProps))
    }
  ],
  syncQueryString: !props.actionIsResultsUrl,
  submit: {
    hideButton: true,
    label: '',
    action: props.action,
    method: props.actionIsResultsUrl ? 'GET' : 'POST',
    async: !props.actionIsResultsUrl,
    immediatelyOnChange: !props.actionIsResultsUrl,
    debounce: 500,
    immediatelyIfPrefilled: !props.actionIsResultsUrl,
    errorMessage: props.submitErrorMessage
  },
  validation: {
    errorMessage: 'Verbeter of vul deze velden in:'
  }
});

const parsePropsToFieldConfig = (field: TFieldProps): any => { // eslint-disable-line
  const config: any = { // eslint-disable-line
    part: 'field',
    type: field.type,
    label: field.label,
    labelHidden: true,
    name: field.name,
    value: field.value,
    placeholder: field.placeholder
  };

  if (field.type === 'searchtext') {
    const searchtextField = field as TSearchtextFieldProps;
    config.buttonText = searchtextField.buttonText;
    config.autofocus = searchtextField.autofocus;
    config.validation = {
      type: 'string',
      rules: [
        {
          params: [''],
          type: 'typeError',
          error: field.typeErrorMessage
        },
        {
          params: [],
          type: 'required',
          error: field.requiredErrorMessage
        }
      ].filter(rule => (rule.type !== 'required' || field.isRequired))
    };
  } else if (field.type === 'select') {
    const selectField = field as TSelectFieldProps;
    config.noOptionsMessage = selectField.noOptionsMessage;
    config.options = selectField.options;
    config.isClearable = true;
  }

  return config;
};

class Errors extends React.Component {
  render() {
    return <></>;
  }
}

const Templates = {
  ...BaseTemplates,
  Form: {
    ...BaseTemplates.Form,
    Errors
  }
};

type TProps = {
  name: string;
  actionIsResultsUrl?: boolean;
  action?: string;
  fields: TFieldProps[];
  submitErrorMessage?: string;
  onChange?: FormChangeHandler;
  onSubmit?: FormSubmitHandler;
  onCancelled?: FormCancelledHandler;
  onSubmitted?: FormSubmittedHandler;
  onError?: FormErrorHandler;
}

export type TFieldProps = {
  type: 'searchtext' | 'select' | 'hidden';
  placeholder?: string;
  label: string;
  name: string;
  value: string;
  isRequired: boolean;
  typeErrorMessage?: string;
  requiredErrorMessage?: string;
  buttonText?: string;
}

export type TSearchtextFieldProps = TFieldProps & {
  buttonText: string;
  autofocus: boolean;
}

export type TSelectFieldProps = TFieldProps & {
  noOptionsMessage: string;
  options: {
    label: string;
    value: string;
  }[];
}

const Form: FC<TProps> = (props) => {
  const formConfig = parsePropsToFormConfig(props);

  return (
    <TLForm
      config={formConfig}
      templates={Templates}
      axios={axiosInstance}
      onChange={props?.onChange}
      onSubmit={props?.onSubmit}
      onCancelled={props?.onCancelled}
      onSubmitted={props?.onSubmitted}
      onError={props?.onError} />
  );
};

// Prevents rerendering on search results page after every input change event
// resulting in an immidiate validation error message in the required searchtext field
const FormMemo = React.memo(Form, (prevProps, nextProps) =>
  Object.keys(prevProps).some(key => prevProps[key] !== nextProps[key]));

export type TFormProps = TProps;
export default FormMemo;