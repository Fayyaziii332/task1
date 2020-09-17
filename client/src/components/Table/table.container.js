import { connect } from "react-redux";
import { fetchData, editTableRow, deleteTableRow } from "./table.actions";
import EmployeesTable from "./table"

const mapStateToProps = state => ({
    errors: state.errors,
    data: state.table.data,
    isEditing: state.auth.loading,
});

const mapMethodToProps = dispatchEvent => ({
    deleteTableRow: (payload, index) => dispatchEvent(deleteTableRow(payload, index)),
    fetchData: () => dispatchEvent(fetchData()),
    editTableRow: (payload, index) => dispatchEvent(editTableRow(payload, index)),
});

export default connect(
    mapStateToProps,
    mapMethodToProps,
)(EmployeesTable);
