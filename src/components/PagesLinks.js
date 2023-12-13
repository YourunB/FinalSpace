import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import './PagesLinks.css';

export const PagesLinks = () => {

  const [openLogin, setOpenLogin] = useState(false);
  const [openModalLogIn, setOpenModalLogIn] = useState(false);
  const [openModalSignUp, setOpenModalSignUp] = useState(false);

  const refLoginMenu = useRef(null);
          
  function getLinkClass(obj) {
    let className="PageLink";
    if ( obj.isActive )
      className+=" ActivePageLink";
    return className;
  }

  function openLoginMenu() {
    if (openLogin === false) setOpenLogin(true);
    if (openLogin === true) {
      refLoginMenu.current.className = 'PagesLinks__login_menu PageLink-hide';
      setTimeout(()=>{setOpenLogin(false);},500);
    }
  }

  function openModal(what) {
    if (what === 'LogIn') {
      setOpenModalLogIn(true);
      setOpenModalSignUp(false);
    } else {
      setOpenModalLogIn(false);
      setOpenModalSignUp(true);
    }
  }

  function checkLogin() {
    console.log(localStorage.login)
  }

  checkLogin();

  const modalWindow = <div>
    <div className='PagesLinks__overlay'></div>
      <div className='PagesLinks__modal-login'>
        <div><span>Enter email</span><input></input></div>
        <div><span>Enter nick</span><input></input></div>
        <div><span>Enter name</span><input></input></div>
        <div><span>Enter age</span><input></input></div>
        <div><span>Enter password</span><input></input></div>
        <div className='PagesLinks__modal-login_controls'>
          <button>LogIn</button>
          <button>SignUp</button>
        </div>
      </div>
  </div>

  return (
    <nav>
      <div>
        <NavLink to="/" end    className={getLinkClass}>Welcome</NavLink>
        <NavLink to="/episodes" className={getLinkClass}>Episodes</NavLink>
        <NavLink to="/characters" className={getLinkClass}>Characters</NavLink>
        {localStorage.login === true ? <NavLink to="/profile" className={getLinkClass}>Profile</NavLink> : null}
        {localStorage.login === true ? <NavLink to="/favorites" className={getLinkClass}>Favorites</NavLink> : null}
        <NavLink to="/about" className={getLinkClass}>About</NavLink>
      </div>
      <div className='PagesLinks__login'>
        <img onClick={()=>{openLoginMenu()}} className='PagesLinks__btn-user' src='../images/svg/user.svg' alt='User'/>
        {openLogin === true ? <ul className='PagesLinks__login_menu' ref={refLoginMenu}>
          {localStorage.login !== true ? <li onClick={()=>{openModal('LogIn')}}>LogIn</li> : null}
          {localStorage.login !== true ? <li onClick={()=>{openModal('SignUp')}}>SignUp</li> : null}
          {localStorage.login === true ?<li>LogOut</li> : null}
        </ul> : null}
        {(openModalLogIn === true || openModalSignUp === true) ? modalWindow : null}
      </div>
    </nav>
  );
};
