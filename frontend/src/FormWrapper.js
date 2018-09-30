import React, { Component } from 'react';
import UsernameForm from './UsernameForm';
import MessageForm from './MessageForm';

class FormWrapper extends Component {

  constructor(props) {
    super(props);

    this.state = {
      usernameArea: true
    };
  }

  onSignIn = username => {
    if (username) {
      this.setState({ usernameArea: false });
      this.props.onSignIn(username);
    }
  }

  render() {
    console.log('render FormWrapper');

    if (this.state.usernameArea) {
      return <UsernameForm onSignIn={this.onSignIn} />
    }

    return <MessageForm onMessageSend={this.props.onMessageSend} />
  }
}

export default FormWrapper;
