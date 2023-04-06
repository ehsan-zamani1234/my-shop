const initialState = {
    selectedItems: [],
    itemsCounter: 0,
    total: 0,
    checkout: false
}

const sumItems = (items) => {
    const itemsCounter = items.reduce((total, product) => total + product.quantity, 0);
    const total = items.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2)
    return {itemsCounter, total}
}

const cartReducer = (state=initialState, action) => {
    console.log(state);
    switch (action.type) {
        case 'ADD_ITEM':
            if (!state.selectedItems.find((item) => item._id === action.payload._id)) {
                state.selectedItems.push({
                    ...action.payload,
                    quantity: 1,
                    
                })
            }
            return {
                ...state,
                selectedItems: [...state.selectedItems],
                ...sumItems(state.selectedItems),
                checkout: false
            }
        case 'REMOVE_ITEM':
            const newSelectedItems = state.selectedItems.filter((item) => item._id !== action.payload._id)
            return {
                ...state,
                selectedItems: [...newSelectedItems],
                ...sumItems(newSelectedItems)
            }
        case 'INCREASE':
            const indexI = state.selectedItems.findIndex((item) => item._id === action.payload._id)
            state.selectedItems[indexI].quantity++;
            return {
                ...state,
                ...sumItems(state.selectedItems)
            }
        case 'DECREASE':
            const indexD = state.selectedItems.findIndex((item) => item._id === action.payload._id)
            state.selectedItems[indexD].quantity--;
            return {
                ...state,
                ...sumItems(state.selectedItems)
            }
        case 'CHECKOUT':
            return {
                selectedItems: [],
                itemsCounter: 0,
                total: 0,
                checkout: true
            }
        case 'CLEAR':
            return {
                selectedItems: [],
                itemsCounter: 0,
                total: 0,
                checkout: false
            }  
            case 'CLEAR_AFTER_CHECKOUT':
                return {
                    selectedItems: [],
                    itemsCounter: 0,
                    total: 0,
                    checkout: true
                }  
        default:
        return state    
    }
}

export default cartReducer