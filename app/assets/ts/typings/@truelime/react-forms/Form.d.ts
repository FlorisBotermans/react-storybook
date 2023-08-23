declare module '@truelime/react-forms' {
  import React from 'react';
  import { AxiosInstance } from 'axios';

  export type TFormProps = {
    config: any;
    templates: any;
    axios?: AxiosInstance;
    onChange?: FormChangeHandler;
    onSubmit?: FormSubmitHandler;
    onCancelled?: FormCancelledHandler;
    onSubmitted?: FormSubmittedHandler;
    onError?: FormErrorHandler;
  }

  export type FormChangeHandler = (
    values: { [key: string]: string }
  ) => void;

  export type FormSubmitHandler = (
    event: React.FocusEvent<HTMLInputElement>
  ) => void;

  export type FormCancelledHandler = (
    args: string[]
  ) => void;

  export type FormSubmittedHandler = (
    response: { data: any; },
    values: string[]
  ) => Promise<void>;

  export type FormErrorHandler = (
    error: Error
  ) => void;

  class Form extends React.Component<TFormProps> {
  }

  const Templates: any;

  export type TFieldConfig = {
    name: string;
    placeholder: string;
    readOnly: boolean;
    disabled: boolean;
    // eslint-disable-next-line @typescript-eslint/ban-types
    validation?: {};
  }

  export type TFieldProps = {
    formikField: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    form: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    isRequired: boolean;
    config: TFieldConfig;
  }

  class Field extends React.Component<TFieldProps> {
    onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  }

  class FieldWrapper extends React.Component<TFieldProps> {
    onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  }

  export {
    Form,
    Field,
    FieldWrapper,
    Templates
  };
}
