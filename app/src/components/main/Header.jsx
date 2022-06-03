import React from 'react';
import { ReactComponent as LogoIcon } from '../../assets/icon.svg';
import './Header.css';

const Header = ({ signOut }) => {
  return(
    <header className='header'>
      <div className='header__logo'>
        <LogoIcon />
        <h1 className='header__title'>ScanSight</h1>
      </div>
      <button onClick={signOut} className='header__logout'>Sign Out</button>
    </header>
  );
}

export default Header;
