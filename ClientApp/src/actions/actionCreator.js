import { DELETE_PRODUCT_CART, ADD_PRODUCT_CART, ADD_TODO, REMOVE_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, GET_ITEM } from './actionsTypes'

let TodoId = 0;

export const addCartItem = id => ({
    type: ADD_PRODUCT_CART,
    id
  });

export const deleteCartItem = id => ({
    type: DELETE_PRODUCT_CART,
    id
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