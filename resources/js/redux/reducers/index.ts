import { combineReducers } from "redux";
import { authReducer } from "./auth-reducer";

const RootReducer = combineReducers({
  authReducer,
});

export default RootReducer;
export type RootState = ReturnType<typeof RootReducer>;
