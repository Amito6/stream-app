import { 
    createStore,
    applyMiddleware,
    combineReducers 
} from "redux";

import { thunk } from "redux-thunk";
import logger from "redux-logger";
import AnimationReducer from "../Tailwind/Animation/Animation.reducer";
import DialogReducer from "../Tailwind/Dialog/Dialog.reducer";
import MoviesReducer from "./AdminPanel/Movies/Movies.reducer";
import RegisterReducer from "./Register/Register.reducer";


const middlewares = applyMiddleware(logger,thunk);

const root = combineReducers({
        //reducer
        AnimationReducer,
        DialogReducer,
        MoviesReducer,
        RegisterReducer
});

const store = createStore(root,{},middlewares);
export default store;