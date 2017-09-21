import { connect } from 'react-redux';
import SettingsMenu from './settings_menu';
import { logoutUser } from '../../actions/session_actions';
import { fetchTeam } from '../../actions/navigation_actions';
import { teamsSelector, tasksSelector,
  currentUserInitials } from '../../reducers/selectors';

const mapStateToProps = state => ({
  teams: teamsSelector(state),
  entities: state.entities
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser()),
  fetchTeam: (team) => dispatch(fetchTeam(team))
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsMenu);