import { combineReducers } from "redux";
import productsReducer from "./products/productsReducer";
import cartReducer from "./cart/cartReducer";
import userReducer from "./user/userReducer";

const rootReducer = combineReducers({
    productsState: productsReducer,
    cartState: cartReducer,
    userSate: userReducer, 
})

export default rootReducer;