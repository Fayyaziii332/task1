import axios from "axios";
import {
    setUserLoading,
    setErrors,
  } from "../../actions/authActions";  
  
export const SET_EMPLOYEE = "SET_EMPLOYEE"

export const setEmployee = status => {
    return {
      type: SET_EMPLOYEE,
      status: status,
    }
  };

  const instance = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 3000,
  });
  
export const addEmployee = empData => dispatch => {
    dispatch(setUserLoading(true));
    instance
      .post("emp/addEmployee", empData)
      .then(res => {
        if(res.status===200){
        dispatch(setEmployee(true));
        }
        dispatch(setUserLoading(false));
      })
      .catch(err => {
        dispatch(setUserLoading(false));
        dispatch(setEmployee(false));
        if (err && !(err.response)) {
          let error = new Error("Something Went Wrong.Check your Internet connection");
          dispatch(setErrors(error))
        }
        else {
          let error1 = new Error(err.response.data.msg);
          dispatch(setErrors(error1))
        }
      }
      );
  };
