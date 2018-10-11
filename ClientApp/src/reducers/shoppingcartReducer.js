export default function reducer(state={
    shoppingcartItems: 0,
}, action) {

    switch (action.type){
        case "ADD_ITEM" : {
            return {
                ...state, 
                shoppingcartItems: [...state.shoppingcartItems, action.newItem],
            }
        }
        default:
            return state
    }
    return state
}