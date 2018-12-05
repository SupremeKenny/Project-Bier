//Data aanwezig in local storage
const INITIAL_DATA = {
    products: localStorage.Favorites ? JSON.parse(localStorage.Favorites) : [],
};

const favorites = (state = INITIAL_DATA, action) => {
    switch (action.type) {
        case "ADD_PRODUCT_FAVORITES":
            //Check
            var index = state.products.some(function(item, index) {
                return item.id === action.id;
            });
            //Voeg toe als leeg
            if (!index) {
                state.products = [
                    ...state.products,
                    {
                        id: action.id,
                        name: action.name,
                        price: action.price,
                        url: action.url,
                    }
                ];
            //Verwijder als item al aanwezig is --> bug: lege grid-velden als je items weer weghaalt na toevoegen
            } else {
              state.products = state.products.filter(
               product => product.id !== action.id)
            }
            
            //Opslaan
            localStorage.setItem('Favorites', JSON.stringify(state.products));
            
            return (state = { 
                products: state.products,
            });

        case "DELETE_PRODUCT_FAVORITES":
            //Check
            var index = state.products.some(function(item, index2) {
                return item.id === action.id;
            });
            //Als item niet aanwezig is
            if (!index) {
                console.log("Product isn't stored so not deleted.")
                return state;
            }
            //Verwijder item
            if (index) {
                state.products = state.products.filter(
                    product => product.id !== action.id
                );
            }
            //Opslaan
            localStorage.setItem("Favorites", JSON.stringify(state.products));

            return (state = {
                products: state.products,
            });

        default:
            return state;
    }
};

export default favorites;