import { ADD_PRODUCT_CART,ADD_TODO, REMOVE_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, GET_ITEM } from './actionsTypes'

let TodoId = 2

export const addCartItem = text => ({
    type: ADD_PRODUCT_CART,
    id: TodoId++,
    text
  });

  
export const addTodo = text => ({
    type: ADD_TODO,
    id: TodoId++,
    text
})

export const getItem = (id) => ({
    type: GET_ITEM,
    id: id
})


export const deleteTodo = (id) => ({
    type: REMOVE_TODO,
    id: id
})

export const toggleTodo = (id) => ({
    type: TOGGLE_TODO,
    id: id
})

export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  filter
})