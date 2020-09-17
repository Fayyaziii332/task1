import { connect } from "react-redux";
import { addEmployee } from "./form.actions";
import Form from "./form"

const mapStateToProps = state => ({
    errors: state.errors,
    status : state.form.status,
    loading : state.auth.loading,
  });

  const mapMethodToProps = dispatchEvent => ({
    addEmployee: (payload) => dispatchEvent(addEmployee(payload))
  });

  export default connect(
    mapStateToProps,
    mapMethodToProps,
  )(Form);
