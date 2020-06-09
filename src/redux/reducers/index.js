import {combineReducers} from "redux"
import authReducer from "./authReducer"
import adminReducer from "./adminReducer";
import visitorReducer from "./visitorReducer";

export default combineReducers({
    auth: authReducer,
    admin: adminReducer,
    visitor: visitorReducer
})