import { createStore } from "redux";
import rootReducer from "../Reducers/reducers";

const store = createStore(rootReducer);

export default store;
