import React from 'react';
import './FormInput.css';

const FormInput = ({ label, change, error,  ...inputProps}) => {

  return(
    <div className='form-input'>
      <input className='form-input__input' onChange={change} {...inputProps} placeholder=' ' autoComplete='off' />
      <label className='form-input__label'>{label}</label>
      <p className='form-input__error'>{error}</p>
    </div>
  );
}

export default FormInput;
