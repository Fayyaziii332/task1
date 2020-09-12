import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_USER,
  LOADING
} from "./actiontypes";


export const setCurrentUser = decoded => {
  return {
    type: SET_USER,
    payload: decoded
  };
};
export const setErrors = error => {
  return {
    type: GET_ERRORS,
    payload: (error && error.response)? error.response.data : error
  }
};
export const setUserLoading = (flag) => {
  return {
    type: LOADING,
    loading : flag
  };
};


export const registerUser = (userData, history) => dispatch => {
  dispatch(setUserLoading(true));
  axios
    .post("http://localhost:5000/users/signup", userData)
    .then(res =>{
      dispatch(setUserLoading(false));
      history.push("/login")
    }) 
    .catch(err =>{
      dispatch(setErrors(err))
      dispatch(setUserLoading(false));
    }
    );
};

export const loginUser = userData => dispatch => {
  dispatch(setUserLoading(true));
  axios
    .post("http://localhost:5000/users/signin", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      dispatch(setUserLoading(false));
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>{
      dispatch(setUserLoading(false));
      dispatch(setErrors(err))
    }
    );
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};