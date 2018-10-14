//Kijken of er wat opgeslagen is in de html5 Storage
const INITIAL_DATA = {
  products: (localStorage.Cart) ? JSON.parse(localStorage.Cart) : [],
  count: (localStorage.CartCount) ? parseInt(localStorage.CartCount) : 0
}

const shoppingcart = (state = INITIAL_DATA, action) => {
    switch (action.type) { 
      case 'ADD_PRODUCT_CART':
      //checken of het item al voorkomt
      var index = state.products.some(function(item, index){
                   return item.id == action.id;
                  })
           
      //Als het item nog niet voorkomt, toevoegen aan state.products                  
      if(!index){
        state.products = [...state.products,{
          id: action.id,
          count: 1,
        },];
      } else { //Als het item al wel voorkomt van dat item de count 1 verhogen
        state.products = state.products.map(item =>
        (item.id === action.id)
        ? {...item, count: item.count + 1}
        : item
        )
      }

      //opslaan in het HTML5 Storage
      localStorage.setItem('Cart', JSON.stringify(state.products));
      localStorage.setItem('CartCount', state.count + 1);

      //state netjes returnen
      return state = {
        count: state.count + 1,
        products: state.products
      };
    
      case 'DELETE_PRODUCT_CART':
        //checken of het item voorkomt
        var index = state.products.some(function(item, index){
          return item.id === action.id;
        })

        //Als het item niet voorkomt, raar maar je hoeft niks te doen dan      
      if(!index){
        console("product isn't stored so not deleted");
        return state
      }

      //in de state 1 count verlagen. als count = 1, helemaal verwijderen.
      state.products = state.products.map(item =>
      (item.id === action.id)
      ? (item.count !== 1) ? {...item, count: item.count - 1}
      : null
      : item
      )
    

      //opslaan in het HTML5 Storage
      localStorage.setItem('Cart', JSON.stringify(state.products));
      localStorage.setItem('CartCount', state.count - 1);

      //state netjes returnen
      return state = {
        count: state.count - 1,
        products: state.products
      };
    



        return state
      case 'CHANGE_COUNT_PRODUCT_CART':
        return state
          
      default:
        return state
    }
  }

export default shoppingcart