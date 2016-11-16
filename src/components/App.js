import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

const mapState = state => ({
  users: state.users,
});

class App extends Component {

  static propTypes = {
    users: PropTypes.array,
    dispatch: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      statefulFunction: true,
    };
  }

  componentWillMount() {
    this.props.dispatch({ type: 'GET_USERS' });
  }

  renderUsers() {
    return this.props.users.map(user => (
      <div key={user.id}>{user.name}</div>
    ));
  }

  render() {
    return (
      <div>
        {this.renderUsers()}
      </div>
    );
  }
}

export default connect(mapState)(App);
