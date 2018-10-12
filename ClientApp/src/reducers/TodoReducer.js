
const INITIAL_DATA = {
    todos: [],
    loaded: false,
    product: null,
}

let tempproduct = {}

const TodoReducer = (state=INITIAL_DATA, action) => {
    switch (action.type){
        case 'ADD_TODO':
            return [
                ...state,{
                    id: action.id,
                    text: action.text,
                    completed: false,
                },
            ]
        case 'TOGGLE_TODO':
            return state.map(todo =>
            (todo.id === action.id)
            ? {...todo, completed: !todo.completed}
            : todo
            )
        case 'REMOVE_TODO':
            const numIndex = parseInt(action.id)
            return state.filter(todo => todo.id !== numIndex);
        case 'GET_ITEM' :
                fetch(
                    "https://localhost:5001/product/fetch?id=" + action.id
                ).then(results => {
                    results.json().then(data => {
                    tempproduct = data.product ;
                    console.log(tempproduct);
                    });
            });
            return state, {loaded: true, product: tempproduct}
        default:
            return state
    }
}

export default TodoReducer