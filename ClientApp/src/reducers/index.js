import { combineReducers } from "redux";

import shoppingcart from "./shoppingcartReducer";
import login from "./loginReducer.js";
import guest from "./guestReducer.js";

export default combineReducers({
  shoppingcart,
  login,
  guest
});
