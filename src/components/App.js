import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import AddUserForm from './AddUserForm';

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
      inputs: {
        username: '',
        contactPhone: '',
        favoriteAnimal: '',
      },
    };
  }

  componentWillMount() {
    this.props.dispatch({ type: 'GET_ALL_THE_THINGS' });
  }

  refreshUsers() {
    this.props.dispatch({ type: 'GET_USERS' });
  }

  addUser() {
    return () => {
      const name = this.state.inputs.username;
      const contactPhone = this.state.inputs.contactPhone;

      if (name) {
        this.props.dispatch({ type: 'ADD_USER', payload: this.state.inputs});
      }
    };
  }

  onFormChange() {
    return inputs => this.setState({ inputs });
  }

  renderUsers() {
    return this.props.users.map(user => (
      <div key={user.id}>{user.name}</div>
    ));
  }

  render() {
    return (
      <div>
        <AddUserForm
          inputs={this.state.inputs}
          onChange={this.onFormChange()}
        />
        <button
          onClick={this.addUser()}
        >
          Add User
        </button>
        <button onClick={() => this.refreshUsers()}>
          REFRESH
        </button>
        {this.renderUsers()}
      </div>
    );
  }
}

export default connect(mapState)(App);
