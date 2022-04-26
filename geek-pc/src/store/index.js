import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
const middlewares = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(rootReducer, middlewares);
export default store;
