import { LOADING } from '../actions/actiontypes';

const initialState = {
  isAuthenticated: false,
  user: { },
  loading: false,
};

export default function authReducers(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
}
