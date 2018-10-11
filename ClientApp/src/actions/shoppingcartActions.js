export function addCartItem(id, text){
    return{
        type: 'ADD_ITEM',
        text
    }
}