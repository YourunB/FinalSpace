import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import './PagesLinks.css';

export const PagesLinks = () => {

  const [logined, setLogined] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openModalLogIn, setOpenModalLogIn] = useState(false);
  const [openModalSignUp, setOpenModalSignUp] = useState(false);

  const refLoginMenu = useRef(null);
  const refInputMail = useRef(null);
  const refInputPass = useRef(null);
  const refInputName = useRef(null);
  const refInputNick = useRef(null);
  const refInputAge = useRef(null);
  
          
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

  function closeModal() {
    setOpenModalLogIn(false);
    setOpenModalSignUp(false);
    openLoginMenu();
  }

  function login() {
    if (refInputMail.current.validity.valid === true && refInputPass.current.value.length >= 8) {
      localStorage.setItem('login', true);
      setLogined(true);
      closeModal();
    } else alert('Error input')
  }

  function logout() {
    delete localStorage.login;
    setLogined(false);
  }

  const modalWindow = <div>
    <div className='PagesLinks__overlay' onClick={()=>{closeModal();}}></div>
      <div className='PagesLinks__modal-login'>
        <div className='PagesLinks__modal-login_head-btn'><button onClick={()=>{closeModal();}}>&#10006;</button></div>
        <div><span>Enter email</span><input ref={refInputMail} pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$' maxLength={40} required></input></div>
        {openModalSignUp === true ? <div><span>Enter nick</span><input ref={refInputNick} maxLength={40} required></input></div> : null}
        {openModalSignUp === true ? <div><span>Enter name</span><input ref={refInputName} minLength={1} maxLength={40} required></input></div> : null}
        {openModalSignUp === true ? <div><span>Enter age</span><input type={'number'} ref={refInputAge}></input></div> : null}
        <div><span>Enter password</span><input type={'password'} ref={refInputPass} minLength={8} maxLength={40} required></input></div>
        <div className='PagesLinks__modal-login_controls'>
          {openModalLogIn === true ? <button onClick={() => {login();}}>LogIn</button> : null}
          {openModalSignUp === true ? <button>SignUp</button> : null}
        </div>
      </div>
  </div>

  return (
    <nav>
      <div>
        <NavLink to="/" end    className={getLinkClass}>Welcome</NavLink>
        <NavLink to="/episodes" className={getLinkClass}>Episodes</NavLink>
        <NavLink to="/characters" className={getLinkClass}>Characters</NavLink>
        {logined === true ? <NavLink to="/profile" className={getLinkClass}>Profile</NavLink> : null}
        {logined === true ? <NavLink to="/favorites" className={getLinkClass}>Favorites</NavLink> : null}
        <NavLink to="/about" className={getLinkClass}>About</NavLink>
      </div>
      <div className='PagesLinks__login'>
        <img onClick={()=>{openLoginMenu()}} className='PagesLinks__btn-user' src='../images/svg/user.svg' alt='User'/>
        {openLogin === true ? <ul className='PagesLinks__login_menu' ref={refLoginMenu}>
          {localStorage.login !== 'true' ? <li onClick={()=>{openModal('LogIn')}}>LogIn</li> : null}
          {localStorage.login !== 'true' ? <li onClick={()=>{openModal('SignUp')}}>SignUp</li> : null}
          {localStorage.login === 'true' ?<li onClick={() => {logout();}}>LogOut</li> : null}
        </ul> : null}
        {(openModalLogIn === true || openModalSignUp === true) ? modalWindow : null}
      </div>
    </nav>
  );
};
