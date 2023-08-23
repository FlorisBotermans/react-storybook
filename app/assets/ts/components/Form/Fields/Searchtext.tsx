import React from 'react';
import { Field, TFieldConfig, TFieldProps } from '@truelime/react-forms';
import SearchIcon from './../../../../icons/search.svg';

type TConfig = TFieldConfig & {
  buttonText: string;
  autofocus: boolean;
}
type TProps = TFieldProps & {
  config: TConfig;
}

export default class Searchtext extends Field {
  declare props: TProps;
  renderInput(): JSX.Element {
    const {
      formikField, isRequired,
      config: {
        name, placeholder, readOnly, disabled, buttonText, autofocus
      }
    } = this.props;

    const submitForm = (): void => {
      this.props.form.formikRef.current.submitForm();
    };

    return (
      <div className="field__searchtext">
        <input
          id={name}
          className="field__input field__searchtext-input"
          type="text"
          placeholder={placeholder}
          readOnly={!!readOnly}
          disabled={!!disabled}
          aria-required={!!isRequired}
          {...formikField}
          value={formikField.value}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          data-autofocus={autofocus}
          onKeyPress={(e) => {
            if (e.key !== 'Enter') return;

            submitForm();
          }} />
        <button
          className="field__searchtext-btn"
          type="button"
          onClick={() => submitForm()}>
          <SearchIcon title={buttonText} className="field__searchtext-btn-icon" />
        </button>
      </div>
    );
  }
}