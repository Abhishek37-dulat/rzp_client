import { createSlice } from "@reduxjs/toolkit";

export const INITIAL_STATE = {
  expenseResponseData: [],
  isSuccess: false,
  isLoading: false,
};

const expenseSlice = createSlice({
  name: "main",
  initialState: INITIAL_STATE,
  reducers: {
    expenseResponse(state, { payload }) {
      return {
        ...state,
        expenseResponseData: [...payload.response],
      };
    },
    newExpense(state, { payload }) {
      console.log(payload.response);
      return {
        ...state,
        expenseResponseData: state.expenseResponseData.push(payload.response),
      };
    },
    getAllExp: (state) => state,
    newExp: (state) => state,
    removeExp: (state) => state,
    updateExpenseSuccessStatus(state, { payload }) {
      return {
        ...state,
        isSuccess: payload,
      };
    },
    updateExpenseLoading(state, { payload }) {
      return {
        ...state,
        isLoading: payload,
      };
    },
  },
});

export const {
  expenseResponse,
  updateExpenseSuccessStatus,
  updateExpenseLoading,
  newExpense,
  newExp,
  getAllExp,
  removeExp,
} = expenseSlice.actions;

export default expenseSlice.reducer;
