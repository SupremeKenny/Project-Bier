
const INITIAL_DATA = []

let tempproduct = {}

const TodoReducer = (state=INITIAL_DATA, action) => {
    switch (action.type){
        case 'GET_ITEM' :
                fetch(
                    "https://localhost:5001/product/fetch?id=" + action.id
                ).then(results => {
                    results.json().then(data => {
                    tempproduct = data.product ;
                    console.log(tempproduct);
                    });
            });
            return [tempproduct
            ]
        default:
            return state
    }
}

export default TodoReducer