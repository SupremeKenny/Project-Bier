//Kijken of er wat opgeslagen is in de html5 Storage
const INITIAL_DATA = {
  products: localStorage.Cart ? JSON.parse(localStorage.Cart) : [],
  count: localStorage.CartCount ? parseInt(localStorage.CartCount) : 0
};

const shoppingcart = (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case "ADD_PRODUCT_CART":
      //checken of het item al voorkomt
      var index = state.products.some(function(item, index) {
        return item.id === action.id;
      });

      //Als het item nog niet voorkomt, toevoegen aan state.products
      if (!index) {
        state.products = [
          ...state.products,
          {
            id: action.id,
            name: action.name,
            price: action.price,
            url: action.url,
            count: 1
          }
        ];
      } else {
        //Als het item al wel voorkomt van dat item de count 1 verhogen
        state.products = state.products.map(
          item =>
            item.id === action.id
              ? {
                  ...item,
                  count: item.count + 1,
                  name: action.name,
                  price: action.price,
                  url: action.url
                }
              : item
        );
      }

      //opslaan in het HTML5 Storage
      localStorage.setItem("Cart", JSON.stringify(state.products));
      localStorage.setItem("CartCount", state.count + 1);

      //state netjes returnen
      return (state = {
        count: state.count + 1,
        products: state.products
      });

    case "DECREMENT_PRODUCT_CART":
      //checken of het item voorkomt
      var index = state.products.some(function(item, index) {
        return item.id === action.id;
      });

      //Als het item niet voorkomt, raar maar je hoeft niks te doen dan
      if (!index) {
        console("product isn't stored so not deleted");
        return state;
      }

      //checken of het het laatste product is
      var laatsteproduct = false;
      state.products.map(
        item =>
          item.id === action.id
            ? item.count <= 1
              ? (laatsteproduct = true)
              : null
            : null
      );

      //als dat zo is. Filter het volledige product eruit.
      if (laatsteproduct == true) {
        console.log(state.products);
        state.products = state.products.filter(
          product => product.id !== action.id
        );
        console.log(state.products);
      } else {
        //als het niet zo is. verander het aantal naar eentje minder.
        state.products = state.products.map(
          item =>
            item.id === action.id ? { ...item, count: item.count - 1 } : item
        );
      }

      //opslaan in het HTML5 Storage
      localStorage.setItem("Cart", JSON.stringify(state.products));
      localStorage.setItem("CartCount", state.count - 1);

      //state netjes returnen
      return (state = {
        count: state.count - 1,
        products: state.products
      });

    case "DELETE_PRODUCT_CART":
      //checken of het item voorkomt
      var index = state.products.some(function(item, index) {
        return item.id === action.id;
      });

      //Als het item niet voorkomt, raar maar je hoeft niks te doen dan
      if (!index) {
        console("product isn't stored so not deleted");
        return state;
      }

     
      

      //als het item voorkomt. eruit filteren
      if (index){
        state.products = state.products.filter(
          product => product.id !== action.id
        );
      }
      
      //opslaan in het HTML5 Storage
      localStorage.setItem("Cart", JSON.stringify(state.products));
      localStorage.setItem("CartCount", state.count - parseInt(action.count));

      //state netjes returnen
      return (state = {
        count: state.count - parseInt(action.count),
        products: state.products
      });

    default:
      return state;
  }
};

export default shoppingcart;
