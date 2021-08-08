import loaderReducer from "./loader";
import { combineReducers } from 'redux';
import alertReducer from "./alert";

const rootReducer = combineReducers({
    loader: loaderReducer,
    alert: alertReducer
})

export default rootReducer;