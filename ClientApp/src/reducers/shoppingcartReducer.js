import {loadState} from '../localStorage.js';

const shoppingcart = (state = loadState(), action) => {
  switch (action.type) {
    case 'ADD_PRODUCT_CART':
      // Check if index exists
      var index = state.products.some(item => {
        return item.id === action.id;
      });

      // If not, add the product to the state
      if (!index) {
        state.products = [
          ...state.products,
          {
            id: action.id,
            name: action.name,
            price: action.price,
            url: action.url,
            count: 1,
          },
        ];
      } else {
        // If it does , increment the count with one
        state.products = state.products.map(item =>
            item.id === action.id
                ? {
                  ...item,
                  count: item.count + 1,
                  name: action.name,
                  price: action.price,
                  url: action.url,
                }
                : item,
        );
      }

      return (state = {
        count: state.count + 1,
        products: state.products,
        totalPrice: state.totalPrice + parseFloat(action.price),
        discount: state.discount
      });

    case 'DECREMENT_PRODUCT_CART':
      // Check if index exists
      var index = state.products.some(item => {
        return item.id === action.id;
      });

      // If the index does not exist, do nothing
      if (!index) {
        return state;
      }

      // Check if the product is the last one in the4 cart of the given product
      var lastOne = false;
      state.products.map(item => (item.id === action.id ? (item.count <= 1 ? (lastOne = true) : null) : null));

      // Remove id if it is the last one
      if (lastOne === true) {
        state.products = state.products.filter(product => product.id !== action.id);
      } else {
        //
        state.products = state.products.map(item =>
            item.id === action.id ? {...item, count: item.count - 1} : item,
        );
      }

      return (state = {
        count: state.count - 1,
        products: state.products,
        totalPrice: state.totalPrice - parseFloat(action.price),
        discount: state.discount
      });

    case 'DELETE_PRODUCT_CART':
      // Check if index exists
      var index = state.products.some(item => {
        return item.id === action.id;
      });

      // If the index does not exist, do nothing
      if (!index) {
        return state;
      }

      // Remove product if it does exist in the state
      if (index) {
        state.products = state.products.filter(product => product.id !== action.id);
      }

      return (state = {
        count: state.count - parseInt(action.count),
        products: state.products,
        totalPrice: state.totalPrice - parseFloat(action.price) * parseInt(action.count),
        discount: state.discount
      });
    case 'CLEAR_CART':
      return (state = {count: 0, totalPrice: 0, products: [], discount: undefined});
    case 'ADD_DISCOUNT':
      state.discount = action.code;
      return state;
    case 'DELETE_DISCOUNT':
      state.discount = undefined;
      return state;
    default:
      if (typeof state === 'undefined') {
        return (state = {count: 0, totalPrice: 0, products: [], discount: undefined});
      } else return state;
  }
};

export default shoppingcart;
