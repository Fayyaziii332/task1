import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {
  GET_ERRORS,
  LOADING
} from "./actiontypes";
// import { response } from "express";



const instance = axios.create({
  baseURL: 'http://localhost:5000/',
  timeout: 3000

});


export const setErrors = error => {
  return {
    type: GET_ERRORS,
    payload: (error && error.response) ? error.response.data : error
  }
};
export const setUserLoading = (flag) => {
  return {
    type: LOADING,
    loading: flag
  };
};


export const registerUser = (userData, history) => dispatch => {
  dispatch(setUserLoading(true));
  instance
    .post("users/signup", userData)
    .then(res => {
      dispatch(setUserLoading(false));
      history.push("/login")
    })
    .catch(err => {

      dispatch(setUserLoading(false));
      if (err && !(err.response)) {
        var error = new Error("Something Went Wrong.Check your Internet connection");
        dispatch(setErrors(error))
      }
      else {
        dispatch(setErrors(err))
      }

    }
    );
};

export const loginUser = userData => dispatch => {


  dispatch(setUserLoading(true));
  instance
    .post("users/signin", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      dispatch(setUserLoading(false));
      setAuthToken(token);

    })
    .catch(err => {
      dispatch(setUserLoading(false));
      if (err && !(err.response)) {
        var error = new Error("Something Went Wrong.Check your Internet connection");
        dispatch(setErrors(error))
      }
      else {
        dispatch(setErrors(err))
      }
    }
    );
};

export const logoutUser = (history) => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  history.push("/login")
};