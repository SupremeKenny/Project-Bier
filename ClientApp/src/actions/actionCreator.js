import { DELETE_PRODUCT_CART, ADD_PRODUCT_CART, DECREMENT_PRODUCT_CART } from './actionsTypes'

let TodoId = 2;

export const addCartItem = (id, name, price, url) => ({
    type: ADD_PRODUCT_CART,
    id,
    name,
    price,
    url,
  });

export const deleteCartItem = (id, count) => ({
    type: DELETE_PRODUCT_CART,
    id, 
    count
});

export const decrementCartItem = id => ({
    type: DECREMENT_PRODUCT_CART,
    id
});

  