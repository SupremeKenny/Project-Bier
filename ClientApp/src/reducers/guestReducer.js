import {loadState} from '../localStorage.js';

const guest = (state = loadState(), action) => {
  switch (action.type) {
    case 'ADD_GUEST':
      return (state = {
        info: action.guestInfo
      });
    case 'DELETE_GUEST':
      return (state = {});
    default:
      if (typeof state === 'undefined') {
        return (state = {});
      } else return state;
  }
};

export default guest;
