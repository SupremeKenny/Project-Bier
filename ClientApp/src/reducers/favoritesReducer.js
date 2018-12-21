import { loadState } from "../localStorage.js";

const favorites = (state = loadState(), action) => {
    let productInFavorites;

    switch (action.type) {
        case "ADD_PRODUCT_FAVORITES":
            productInFavorites = state.products.some(item => {
                return item.id === action.id;
            });

            // If not in the state add it to the state
            if (!productInFavorites) {
                state.products = [
                    ...state.products,
                    {
                        id: action.id,
                        name: action.name,
                        price: action.price,
                        url: action.url
                    }
                ];
            }

            return (state = {
                products: state.products,
            });

        case "DELETE_PRODUCT_FAVORITES":
            productInFavorites = state.products.some(item => {
                return item.id === action.id;
            });

            // If the product is in the state remove it 
            if (productInFavorites) {
                state.products = state.products.filter(
                    product => product.id !== action.id
                );
            } else return state;

            return (state = {
                products: state.products,
            });

        default:
            if (typeof state === "undefined") {
                return (state = {products:[]});
            } else return state;
    }
};

export default favorites;