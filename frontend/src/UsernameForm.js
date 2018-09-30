import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'

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
          <Form.Input placeholder='username' onChange={this.onUsernameChange} /> 
          <Button content='Next' labelPosition='right' icon='angle double right' primary />
        </Form.Group> 
      </Form> 
    );
  }
}

export default UsernameForm;