import axios from "axios";
import { setUserLoading, setErrors, } from "../../actions/authActions";

export const FETCH_DATA = "FETCH_DATA"
export const EDIT_DATA = "EDIT_DATA"
export const DELETE_DATA = "DELETE_DATA"

export const setTableData = data => {
    return {
        type: FETCH_DATA,
        data: data,
    }
};

export const editData = (data, index) => {
    return {
        type: EDIT_DATA,
        data: data,
        index: index,
    }
};
export const deleteData = (index) => {
    return {
        type: DELETE_DATA,
        index: index,
    }
};

const instance = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 3000,
});

export const fetchData = () => dispatch => {
    dispatch(setUserLoading(true));
    instance
        .get("emp/viewEmployees")
        .then(res => {
            dispatch(setTableData(res.data));
            dispatch(setUserLoading(false));
        })
        .catch(err => {
            dispatch(setUserLoading(false));
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

export const editTableRow = (empData, index) => dispatch => {
    dispatch(setUserLoading(true));
    instance
        .put("emp/editEmployees", empData)
        .then(res => {
            dispatch(editData(res.data, index));
            dispatch(setUserLoading(false));
        })
        .catch(err => {
            dispatch(setUserLoading(false));
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

export const deleteTableRow = (empData, index) => dispatch => {
    dispatch(setUserLoading(true));
    instance
        .delete("emp/deleteEmployees/" + empData._id)
        .then(res => {
            if (res.status === 200) {
                dispatch(deleteData(index));
            }
            dispatch(setUserLoading(false));
        })
        .catch(err => {
            dispatch(setUserLoading(false));
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
