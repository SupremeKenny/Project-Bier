import { combineReducers } from "redux";

import shoppingcart from "./shoppingcartReducer";
import login from "./loginReducer.js";

export default combineReducers({
  shoppingcart,
  login
});
