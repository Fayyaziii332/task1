import { connect } from "react-redux";
import Landing from "./Landing"

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps)(Landing);