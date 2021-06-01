import { combineReducers } from "redux";
import colorReducer from "redux/color-reducer";
import authReducer from "redux/auth-reducer";

const rootReducer = combineReducers({
    colorReducer,
    authReducer
});

export default rootReducer;