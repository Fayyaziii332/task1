import { logoutUser } from "../../actions/authActions";
import { connect } from "react-redux";
import Dashboard from "./Dashboard"
const mapStateToProps = state => ({
    auth: state.auth
  });

const mapDispatchToProps = dispatchEvent => ({
logoutUser : () => dispatchEvent(logoutUser())
})

  export default connect(
    mapStateToProps,
    mapDispatchToProps 
  )(Dashboard);