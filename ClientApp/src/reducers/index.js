import { combineReducers } from "redux"

import shoppingcart from "./shoppingcartReducer"
import favorites from "./favoritesReducer"

export default combineReducers({
    shoppingcart,
    favorites
})