import { createStore } from "redux";
import { authReducer } from "./reducer";

let store = createStore(authReducer);


export default store;