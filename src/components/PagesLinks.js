import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateLoginState, updateDbFireBase, updateActiveUser, updateUid } from "../redux/dataSlice.js";

import { getDatabase, child, ref, push, update, onValue  } from "firebase/database";
import { app } from './firebaseModule';

import './PagesLinks.css';

export const PagesLinks = () => {

  const dispatch = useDispatch();
  const dataRedux = useSelector( state => state.data );

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

  const db = getDatabase(app);

  if (dataRedux.db === null) {
    getDb();
  }

  function getDb() {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      dispatch(updateDbFireBase(data));
    });
  }

  function addUserDb(name, nick, age, mail, pass) {
    const postData = {
      name: name,
      nick: nick,
      age: age,
      mail: mail,
      pass: pass,
    };
  
    const newPostKey = push(child(ref(db), 'posts')).key;
  
    const updates = {};
    updates['/users/' + newPostKey] = postData;
  
    const res = update(ref(db), updates);
    getDb();
  }

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
      let coincidencesMail = false;
      let coincidencesPass = false;
      let mail = refInputMail.current.value;
      let pass = refInputPass.current.value;
      let uid = null;
      for (let key in dataRedux.db.users) {
        if (dataRedux.db.users[key].mail == mail && dataRedux.db.users[key].pass == pass ) {
          coincidencesMail = true;
          coincidencesPass = true;
          uid = key;
        }
      }
      if (coincidencesMail === true && coincidencesPass === true) {
        closeModal();
        dispatch(updateLoginState(true));
        dispatch(updateActiveUser(mail));
        dispatch(updateUid(uid));
        setLogined(true);
      } else alert('There are no matches');
    } else alert('Error input');
  }

  function signup() {
    if (refInputMail.current.validity.valid === true && refInputPass.current.value.length >= 8 && refInputName.current.value.length > 0 && refInputNick.current.value.length > 0 &&  Number(refInputAge.current.value) > 5 && Number(refInputAge.current.value) < 100) {
      let coincidencesMail = false;
      let mail = refInputMail.current.value
      let uid = null;
      if (dataRedux.db !== null && dataRedux.db.users !== undefined) for (let key in dataRedux.db.users) if (dataRedux.db.users[key].mail == mail) coincidencesMail = true;
      if (coincidencesMail === false) {
        addUserDb(refInputName.current.value, refInputNick.current.value, refInputAge.current.value, refInputMail.current.value, refInputPass.current.value);
        closeModal();
        dispatch(updateLoginState(true));
        dispatch(updateActiveUser(mail));
        dispatch(updateUid(uid));
        setLogined(true);
      } else alert('Such a user exists');
    } else alert('Error input');
  }

  function logout() {
    dispatch(updateLoginState(false));
    dispatch(updateActiveUser(null));
    dispatch(updateUid(null));
    setLogined(false);
    closeModal();
  }

  const modalWindow = <div>
    <div className='PagesLinks__overlay' onClick={()=>{closeModal();}}></div>
      <div className='PagesLinks__modal-login'>
        <div className='PagesLinks__modal-login_head-btn'><button onClick={()=>{closeModal();}}>&#10006;</button></div>
        <div><span>Enter email</span><input ref={refInputMail} pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$' maxLength={40} required></input></div>
        {openModalSignUp === true ? <div><span>Enter nick</span><input ref={refInputNick} maxLength={40} required></input></div> : null}
        {openModalSignUp === true ? <div><span>Enter name</span><input ref={refInputName} minLength={1} maxLength={40} required></input></div> : null}
        {openModalSignUp === true ? <div><span>Enter age</span><input type={'number'} ref={refInputAge}></input></div> : null}
        <div><span>Enter password</span><input type={'password'} ref={refInputPass}></input></div>
        <div className='PagesLinks__modal-login_controls'>
          {openModalLogIn === true ? <button onClick={() => {login();}}>LogIn</button> : null}
          {openModalSignUp === true ? <button onClick={()=>{signup();}}>SignUp</button> : null}
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
          {dataRedux.login !== true ? <li onClick={()=>{openModal('LogIn')}}>LogIn</li> : null}
          {dataRedux.login !== true ? <li onClick={()=>{openModal('SignUp')}}>SignUp</li> : null}
          {dataRedux.login === true ?<li onClick={() => {logout();}}>LogOut</li> : null}
        </ul> : null}
        {(openModalLogIn === true || openModalSignUp === true) ? modalWindow : null}
      </div>
    </nav>
  );
};
