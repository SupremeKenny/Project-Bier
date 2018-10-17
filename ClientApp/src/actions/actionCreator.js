import { DELETE_PRODUCT_CART, ADD_PRODUCT_CART, DECREMENT_PRODUCT_CART } from './actionsTypes'

let TodoId = 2;

export const addCartItem = (id, name, price, url) => ({
    type: ADD_PRODUCT_CART,
    id,
    name,
    price,
    url,
  });

export const deleteCartItem = (id, count, price) => ({
    type: DELETE_PRODUCT_CART,
    id, 
    count,
    price
});

export const decrementCartItem = (id, price) => ({
    type: DECREMENT_PRODUCT_CART,
    id,
    price
});

  