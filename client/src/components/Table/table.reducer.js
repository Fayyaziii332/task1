import { FETCH_DATA, EDIT_DATA, DELETE_DATA } from './table.actions';

const initialState = {
    data: [],
};

export default function tableReducers(state = initialState, action) {
    switch (action.type) {
        case FETCH_DATA:
            return {
                ...state,
                data: action.data,
            };
        case EDIT_DATA:
            state.data.splice(action.index, 1, action.data)
            return {
                ...state,
                data: [...state.data],
            };
        case DELETE_DATA:
            state.data.splice(action.index, 1);
            return {
                ...state,
                data: [...state.data],
            };
        default:
            return state;
    }
}
