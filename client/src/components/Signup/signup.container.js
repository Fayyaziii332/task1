import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import Signup from "./signup"
import { withRouter} from "react-router-dom";

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });

const mapMethodToProps = dispatchEvent  => ({
    registerUser : (payload,history) => dispatchEvent(registerUser(payload,history))
  });

  export default connect(
    mapStateToProps,
    mapMethodToProps 
  )(withRouter(Signup));