import { 
    createStore,
    applyMiddleware,
    combineReducers 
} from "redux";

import { thunk } from "redux-thunk";
import logger from "redux-logger";
import AnimationReducer from "../Tailwind/Animation/Animation.reducer";

const middlewares = applyMiddleware(logger,thunk);

const root = combineReducers({
        //reducer
        AnimationReducer
});

const store = createStore(root,{},middlewares);
export default store;