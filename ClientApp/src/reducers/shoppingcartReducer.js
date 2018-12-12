//Kijken of er wat opgeslagen is in de html5 Storage
const INITIAL_DATA = {
  products: localStorage.Cart ? JSON.parse(localStorage.Cart) : [],
  count: localStorage.CartCount ? parseInt(localStorage.CartCount) : 0,
  totalPrice: localStorage.TotalPrice ? parseFloat(localStorage.TotalPrice) : 0
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
      localStorage.setItem("TotalPrice", state.totalPrice + parseFloat(action.price));

      //state netjes returnen
      return (state = {
        count: state.count + 1,
        products: state.products,
        totalPrice: state.totalPrice + parseFloat(action.price)
      });

    case "DECREMENT_PRODUCT_CART":
      //checken of het item voorkomt
      var index = state.products.some(function(item, index) {
        return item.id === action.id;
      });

      //Als het item niet voorkomt, raar maar je hoeft niks te doen dan
      if (!index) {
        console.log("product isn't stored so not deleted");
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
        state.products = state.products.filter(
          product => product.id !== action.id
        );
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
      localStorage.setItem("TotalPrice", state.totalPrice - parseFloat(action.price));

      //state netjes returnen
      return (state = {
        count: state.count - 1,
        products: state.products,
        totalPrice: state.totalPrice - parseFloat(action.price)
      });

    case "DELETE_PRODUCT_CART":
      //checken of het item voorkomt
      var index = state.products.some(function(item, index) {
        return item.id === action.id;
      });

      //Als het item niet voorkomt, raar maar je hoeft niks te doen dan
      if (!index) {
        console.log("product isn't stored so not deleted");
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
      localStorage.setItem("TotalPrice", state.totalPrice - (parseFloat(action.price)*parseInt(action.count)));

      //state netjes returnen
      return (state = {
        count: state.count - parseInt(action.count),
        products: state.products,
        totalPrice: state.totalPrice - parseFloat(action.price)*parseInt(action.count),
      });
    case "CLEAR_CART":

      //clear in HTML5 Storage
      localStorage.clear();
      localStorage.setItem("TotalPrice", 0.0);


      return (state = {count: 0, CartCount: 0, products:[], totalPrice: 0.0});
    default:
      return state;
  }
};

export default shoppingcart;
