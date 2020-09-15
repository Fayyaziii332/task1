import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import Dashboard from './Dashboard';

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatchEvent) => ({
  logoutUser: (history) => dispatchEvent(logoutUser(history)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
