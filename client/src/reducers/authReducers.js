import {SET_USER,LOADING} from "../actions/actiontypes";
const isEmpty = require("is-empty");

  const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false
  };
  
  export default function authReducers(state = initialState, action){
    switch (action.type) {
      case SET_USER:
        return {
          ...state,
          isAuthenticated: !isEmpty(action.payload),
          user: action.payload
        };
      case LOADING:
        return {
          ...state,
          loading: action.loading
        };
      default:
        return state;
    }
  }