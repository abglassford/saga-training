import React, { Component, PropTypes } from 'react';

class AddUserForm extends Component {

  static propTypes = {
    users: PropTypes.array,
    inputs: PropTypes.object,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    users: [],
    inputs: {
      username: '',
      contactPhone: '',
    },
    onChange: () => null,
  };

  usernameIsValid() {
    const username = this.props.inputs.username;
    const users = this.props.users;

    const containsName = users.filter(user => user.name === username);

    if (username === '') {
      return false;
    } else if (containsName.length > 0) {
      return false;
    }
    return true;
  }

  onInputChange(name) {
    return (e) => {
      const value = e.target.value;

      const newInputs = {
        ...this.props.inputs,
        [name]: name === 'contactPhone' ? value.match(/\d*/g).join('') : value,
      };

      this.props.onChange(newInputs);
    }
  }

  render() {
    const isValid = this.usernameIsValid();

    return (
      <div>
        <div>
          <input
            type="text"
            value={this.props.inputs.username}
            onChange={this.onInputChange('username')}
          />
          <input
            type="text"
            value={this.props.inputs.contactPhone}
            onChange={this.onInputChange('contactPhone')}
          />
          <input
            type="text"
            value={this.props.inputs.favoriteAnimal}
            onChange={this.onInputChange('favoriteAnimal')}
          />
        </div>
        {isValid ? 'VALID' : 'YOU ARE WRONG!'}
      </div>
    );
  }
}

export default AddUserForm;
