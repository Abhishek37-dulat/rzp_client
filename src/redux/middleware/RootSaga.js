import { all } from "redux-saga/effects";
import { watchMainSagas } from "./sagas/AuthSaga";
import { watchExpenseSagas } from "./sagas/ExpenseSaga";

export default function* rootSaga() {
  yield all([watchMainSagas(), watchExpenseSagas()]);
}
