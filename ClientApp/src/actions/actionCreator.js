import { DELETE_PRODUCT_CART, ADD_PRODUCT_CART, DECREMENT_PRODUCT_CART, CLEAR_CART, ADD_PRODUCT_FAVORITES, DELETE_PRODUCT_FAVORITES } from './actionsTypes'

export const clearCart = () => ({
    type: CLEAR_CART,
});

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

export const addFavoritesItem = (id, name, price, url) => ({
    type: ADD_PRODUCT_FAVORITES,
    id,
    name,
    price,
    url,
});

export const deleteFavoritesItem = (id, price) => ({
    type: DELETE_PRODUCT_FAVORITES,
    id,
    price
});
  