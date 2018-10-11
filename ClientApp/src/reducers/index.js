import { combineReducers } from "redux"

import shoppingcart from "./shoppingcartReducer"
import todos from './TodoReducer'

export default combineReducers({
    shoppingcart,
    todos
})