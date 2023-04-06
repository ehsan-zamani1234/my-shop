import { legacy_createStore as createStore} from 'redux'
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'

const data = JSON.parse(localStorage.getItem('userFromLocal')) || {}
const cartData = JSON.parse(localStorage.getItem('productsUserSelected')) || []
const initialState = {userSate:{
    loading: false,
    userData: {...data},
    error: ''
},
cartState:{
    selectedItems: [...cartData.selectedItems],
    itemsCounter: cartData.itemsCounter,
    total: cartData.total,
    checkout: cartData.checkout
},
}



const store =  createStore(rootReducer, initialState, applyMiddleware(thunk))

export default store