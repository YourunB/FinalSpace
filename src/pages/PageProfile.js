import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDbFireBase } from "../redux/dataSlice.js";

import { getDatabase, child, ref, push, update, onValue  } from "firebase/database";
import { app } from '../components/firebaseModule';

import './PageProfile.css';

export const PageProfile = () => {
  
  const dispatch = useDispatch();
  const dataRedux = useSelector( state => state.data );

  const refInputPass = useRef(null);
  const refInputName = useRef(null);
  const refInputNick = useRef(null);
  const refInputAge = useRef(null);
  const refInputMail = useRef(null);

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

  function editUserDb(uid, name, nick, age, mail, pass) {
    update(ref(db, `/users/${uid}`), {
      name: name,
      nick: nick,
      age: age,
      pass: pass,
      mail: mail,
    })
    .then(() => {
      getDb();
    })
    .catch((error) => {
      console.error("Error: ", error);
    })
  }

  function applyEdit() {
    if (refInputPass.current.value.length >= 8 && refInputName.current.value.length > 0 && refInputNick.current.value.length > 0 &&  Number(refInputAge.current.value) > 5 && Number(refInputAge.current.value) < 100) {
      editUserDb(dataRedux.uid, refInputName.current.value, refInputNick.current.value, refInputAge.current.value, refInputMail.current.value, refInputPass.current.value);
    } else alert('Error input');
  }

  let userInfo = null;
  if (dataRedux.uid !== null) {
    const base = {...dataRedux.db};
    const user = {...base.users}
    console.log(user[dataRedux.uid]);

    userInfo = <div className='PageProfile__info'>
      <h3>Hello dear <span>{user[dataRedux.uid].name}</span>!</h3>
      <div className='PageProfile__info_box-image'><img src='images/svg/user.svg' alt='Final Space'/></div>
      <h4>This is your profile page. Here you can change your profile information.</h4>
      <div className='PageProfile__info_change'>
        <div>
          <span>Your name: </span>
          <input ref={refInputName} defaultValue={user[dataRedux.uid].name}></input>
        </div>  
        <div>
          <span>Your nick: </span>
          <input ref={refInputNick} defaultValue={user[dataRedux.uid].nick}></input>
        </div>
        <div>
          <span>Your age: </span>
          <input type={'number'} ref={refInputAge} defaultValue={user[dataRedux.uid].age}></input>
        </div>
        <div>
          <span>Your mail: </span>
          <input ref={refInputMail} defaultValue={user[dataRedux.uid].mail}></input>
        </div>
        <div>
          <span>Your pass: </span>
          <input type={'password'} ref={refInputPass} defaultValue={user[dataRedux.uid].pass}></input>
        </div>
        <div className='PageProfile__info_change_controls'><button onClick={()=>{applyEdit();}}>Apply</button></div>
      </div>
    </div>
  }
          
  return (
    <div className='PageProfile'>
      <h1>Profile page</h1>
      {dataRedux.activeUser === null ? 'Please login first to see your profile...' : null}
      {userInfo}
    </div>
  );
    
};
