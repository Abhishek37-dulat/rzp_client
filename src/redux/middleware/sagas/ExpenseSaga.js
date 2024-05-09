import { put, call, takeLatest } from "redux-saga/effects";
import {
  AddExpense,
  GetAllExpense,
  GetSingleExpense,
  UpdateExpense,
  DeleteExpense,
} from "../../../api/expenseApi";
// import * as userAction from ''
import { success, error } from "../../../modules/shared/Notifications";
import * as actions from "../../reducers/ducks/ExpenseDuck";

export function* addExpense({ payload }) {
  try {
    const exp = yield call(AddExpense, payload);
    yield put(actions.updateExpenseSuccessStatus(true));
    if (exp?.data?.status === 200 || exp?.data?.status === 201) {
      yield put(actions.newExpense({ response: exp?.data?.data }));
      yield put(actions.updateExpenseLoading(false));
    } else if (exp?.data?.status === 400 || exp?.data?.status === 401) {
      error(exp?.data?.message);
    } else {
      error(exp?.data?.message || exp?.message || exp?.data?.data?.message);
    }
    yield put(actions.updateExpenseLoading(false));
  } catch (error) {
    yield put(actions.updateExpenseLoading(false));
  } finally {
    yield put(actions.updateExpenseLoading(false));
  }
}

export function* allExpense({ payload }) {
  //   alert("yes");
  try {
    const exp = yield call(GetAllExpense, payload);
    yield put(actions.updateExpenseSuccessStatus(true));
    if (exp?.status === 200 || exp?.status === 201) {
      console.log(exp);
      yield put(actions.expenseResponse({ response: exp?.data?.data }));
      yield put(actions.updateExpenseLoading(false));

      success(exp?.data?.message);
    } else if (exp?.status === 401 || exp?.status === 400) {
      yield put(actions.updateExpenseLoading(false));
    } else if (exp?.status === 500 || exp?.status === 501) {
      yield put(actions.updateExpenseLoading(false));
    }
  } catch (error) {
    yield put(actions.updateExpenseLoading(false));
  } finally {
    yield put(actions.updateExpenseLoading(false));
  }
}

export function* deleteExpense({ payload }) {
  try {
    const exp = yield call(DeleteExpense, payload);
    yield put(actions.updateExpenseSuccessStatus(true));
    if (exp?.data?.status === 200 || exp?.data?.status === 201) {
      // yield put(actions.newExpense({ response: exp?.data?.data }));
      // yield put(actions.updateExpenseLoading(false));
      success("item removed");
    } else if (exp?.data?.status === 400 || exp?.data?.status === 401) {
      error(exp?.data?.message);
    } else {
      error(exp?.data?.message || exp?.message || exp?.data?.data?.message);
    }
    yield put(actions.updateExpenseLoading(false));
  } catch (error) {
    yield put(actions.updateExpenseLoading(false));
  } finally {
    yield put(actions.updateExpenseLoading(false));
  }
}

export function* watchExpenseSagas() {
  yield takeLatest(actions.getAllExp.type, allExpense);
  yield takeLatest(actions.newExp.type, addExpense);
  yield takeLatest(actions.removeExp.type, deleteExpense);
}
