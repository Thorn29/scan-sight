import React from 'react';
import FormInput from './FormInput';
import './Form.css';

const SignUpForm = ({ change, submit, errors }) => {
  return(
    <form className='form' onSubmit={submit}>
      <h1 className='form__title'>Sign Up</h1>
      <FormInput type='text' name='name' label='Name' required change={change}  error={errors.name} />
      <FormInput type='email' name='email' label='E-Mail' required change={change}  error={errors.email}  />
      <FormInput type='password' name='password' label='Password' required change={change} error={errors.password} />
      <input className='form__submit' type='submit' value='Enter' />
    </form>
  );
}

export default SignUpForm;
