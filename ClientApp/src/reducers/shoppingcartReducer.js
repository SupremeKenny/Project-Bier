const INITIAL_DATA = {
  products: [],
}

const shoppingcart = (state = INITIAL_DATA, action) => {
    switch (action.type) {
      case 'ADD_PRODUCT_CART':
      console.log(state);
      return state.products.map( product => {
        if(product.id !== action.id){

          return {id: product.id,
            count: product.count,};
        }
        product.count = action.count + 1;
        return {
          ...product,
          //...action.item.count
        }

      })
      if (typeof state.products.find(action.text) != undefined) {
        [
          ...state,{
            id: action.text,
            count: 1,
          },
        ]
      } else {
        return state.map(product => 
          (product.id === action.id)
           ? {...product, count: action.count} : product
          ) 

      }
        return
      [
        ...state,{
          id: action.text,
          count: 1,
        },];
        

         
      default:
        return state
    }
  }

export default shoppingcart