import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import Signin from "./signin"

const mapStateToProps = state => ({
    errors: state.errors,
    loading : state.auth.loading
  });

  const mapMethodToProps = dispatchEvent => ({
    loginUser: (payload) => dispatchEvent(loginUser(payload))
  });

  export default connect(
    mapStateToProps,
    mapMethodToProps
  )(Signin);
