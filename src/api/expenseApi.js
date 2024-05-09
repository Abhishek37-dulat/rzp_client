import { isArray } from "lodash";
import axios from "axios";
import urls from "./urls.js";

export const AddExpense = async (data) => {
  //   console.log(data);
  try {
    return await axios.post(`${urls.expense.add}`, data.formData, {
      headers: { Authorization: data.token },
    });
  } catch (err) {
    return { status: 400, message: err.response?.data?.message };
  }
};

export const GetAllExpense = async (auth) => {
  try {
    return await axios.get(`${urls.expense.getall}`, {
      headers: { Authorization: auth },
    });
  } catch (err) {
    return { status: 400, message: err.response?.data?.message };
  }
};
export const GetSingleExpense = async (data, auth) => {
  try {
    return await axios.get(`${urls.expense.single}/${data}`, {
      headers: { Authorization: auth },
    });
  } catch (err) {
    return { status: 400, message: err.response?.data?.message };
  }
};

export const UpdateExpense = async (data, auth) => {
  try {
    console.log(data);
    return await axios.put(`${urls.expense.update}/${data}`, {
      headers: { Authorization: auth },
    });
  } catch (err) {
    return { status: 400, message: err.response?.data?.message };
  }
};

export const DeleteExpense = async (data) => {
  console.log(data);
  try {
    return await axios.delete(`${urls.expense.delete}/${data.id}`, {
      headers: { Authorization: data.token },
    });
  } catch (err) {
    return { status: 400, message: err.response?.data?.message };
  }
};
