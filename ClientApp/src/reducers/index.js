import {combineReducers} from 'redux';

import shoppingcart from './shoppingcartReducer';
import login from './loginReducer.js';
import guest from './guestReducer.js';
import favorites from './favoritesReducer';

export default combineReducers({
  shoppingcart,
  login,
  guest,
  favorites
});
