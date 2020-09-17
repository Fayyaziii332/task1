import { combineReducers } from 'redux';
import authReducer from './authReducers';
import errorReducer from './errorReducers';
import formReducer from '../components/Form/form.reducer';
import tableReducer from '../components/Table/table.reducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  form: formReducer,
  table: tableReducer,
});
