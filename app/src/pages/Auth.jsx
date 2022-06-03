import React, { useState } from 'react';
import axios from 'axios';
import SignUpForm from '../components/auth/SignUpForm';
import SignInForm from '../components/auth/SignInForm';
import './Auth.css';

const Auth = ({ addUser }) => {

  const [ rightForm, setRightForm ] = useState(false);
  const [ signUpInputs, setSignUpInputs ] = useState({ name: '', email: '', password: ''});
  const [ signInInputs, setSignInInputs ] = useState({ email: '', password: ''});
  const [ signUpErrors, setSignUpErrors ] = useState({ name: '', email: '', password: ''});
  const [ signInErrors, setSignInErrors ] = useState({ email: '', password: ''});

  const onSignInChange = e => setSignInInputs(prevInp => {
    setSignInErrors({ email: '', password: ''});
    return {...prevInp, [e.target.name]: e.target.value};
  });

  const onSignUpChange = e => setSignUpInputs(prevInp => {
    setSignUpErrors({ name: '', email: '', password: ''});
    return {...prevInp, [e.target.name]: e.target.value};
  });

  const onSignIn = e => {
    e.preventDefault();

    if (!signInInputs.email.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)) {
      return setSignInErrors(prev => {
        return {...prev, email: 'E-Mail is invalid'}
      })
    }

    if (signInInputs.password.trim().length <= 0) {
      return setSignInErrors(prev => {
        return {...prev, password: 'Password is required'}
      })
    }

    axios.post('/signin', signInInputs).then(res => {
      localStorage.setItem('token', JSON.stringify(res.data.token));
      addUser({ id: res.data.id, name: res.data.name })
    }).catch(err => setSignInErrors(prev => {
      return {...prev, password: err.response.data}
    }))
  }

  const onSignUp = e => {
    e.preventDefault();

    if (signUpInputs.name.trim().length <= 0) {
      return setSignUpErrors(prev => {
        return {...prev, name: 'Name is required'}
      })
    }

    if (!signUpInputs.email.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)) {
      return setSignUpErrors(prev => {
        return {...prev, email: 'E-Mail is invalid'}
      })
    }

    if (signUpInputs.password.trim().length <= 0) {
      return setSignUpErrors(prev => {
        return {...prev, password: 'Password is required'}
      })
    }

    axios.post('/signup', signUpInputs).then(res => {
      localStorage.setItem('token', JSON.stringify(res.data.token));
      addUser({ id: res.data.id, name: res.data.name })
    }).catch(err => setSignUpErrors(prev => {
      return {...prev, password: err.response.data}
    }))
  }

  const changeAuth = () => setRightForm(prevSt => !prevSt);

  return(
    <div className={rightForm ? 'auth switch' : 'auth'}>
      <div className='auth__window'>
        <figure className='auth__left'>
          <SignInForm change={onSignInChange} submit={onSignIn} errors={signInErrors} />
          <p onClick={changeAuth} className='auth__change'>Don't have an account? Sign up instead</p>
        </figure>
        <figure className='auth__right'>
          <SignUpForm change={onSignUpChange} submit={onSignUp} errors={signUpErrors} />
          <p onClick={changeAuth}  className='auth__change'>Already have an account? Sign in instead</p>
        </figure>
      </div>
    </div>
  );
}

export default Auth;
