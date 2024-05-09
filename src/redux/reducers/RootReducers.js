import authorization from "./ducks/MainDuck";
import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";
import expense from "./ducks/ExpenseDuck";

const appVersion = process.env?.REACT_APP_VERSION ?? "0.0.0";

const persistConfig = {
  key: `rootstore_${appVersion}`,
  storage,
};

const reducers = {
  authorization,
  expense,
};

export default persistCombineReducers(persistConfig, reducers);
