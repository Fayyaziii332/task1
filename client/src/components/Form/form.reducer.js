import { SET_EMPLOYEE } from './form.actions';

const initialState = {
    status: false,
};

export default function authReducers(state = initialState, action) {
    switch (action.type) {
        case SET_EMPLOYEE:
            return {
                ...state,
                status: action.status,
            };
        default:
            return state;
    }
}
