import React, { Component } from 'react';
import { Form } from 'semantic-ui-react'

class UsernameForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: ''
    };
  }

  onUsernameChange = event => {
    this.setState({ username: event.target.value });
  }

  onFormSubmit = event => {
    event.preventDefault();
    this.props.onSignIn(this.state.username);
  }

  render() {
    console.log('render UsernameForm');

    return (
      <Form reply onSubmit={this.onFormSubmit}>
        <Form.Group>
          <Form.Input placeholder='username' onChange={this.onUsernameChange} action={{ color: 'blue', labelPosition: 'right', icon: 'angle double right', content: 'Next' }} /> 
        </Form.Group> 
      </Form> 
    );
  }
}

export default UsernameForm;
