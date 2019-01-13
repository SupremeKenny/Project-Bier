import {loadState} from '../localStorage.js';
import decode from 'jwt-decode';

const login = (state = loadState(), action) => {
  switch (action.type) {
    case 'LOGIN':
      let userInfo = decode(action.token);
      return (state = {
        ...state,
        token: action.token,
        userName: userInfo['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
        expiry: userInfo['exp'],
        loggedIn: true,
        email: userInfo['sub'],
      });
    case 'LOGOUT':
      return (state = {...state, token: '', email: '', loggedIn: false});
    case 'CHANGE_NAME':
      state.userName = action.name;
      return state;
    default:
      if (typeof state === 'undefined') {
        return (state = {...state, token: '', email: '', loggedIn: false});
      } else return state;
  }
};

export default login;
