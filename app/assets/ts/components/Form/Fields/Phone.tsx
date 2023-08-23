import React from 'react';
import { Field } from '@truelime/react-forms';

export default class Phone extends Field {
  renderInput(): JSX.Element {
    const {
      formikField, isRequired,
      config: {
        name, placeholder, readOnly, disabled
      }
    } = this.props;

    return (
      <input
        id={name}
        className="field__input field__input--text"
        type="tel"
        placeholder={placeholder}
        readOnly={!!readOnly}
        disabled={!!disabled}
        aria-required={!!isRequired}
        {...formikField}
        value={formikField.value}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      />
    );
  }
}