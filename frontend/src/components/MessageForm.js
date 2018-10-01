import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'

class MessageForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      message: ''
    };
  }

  onMessageChange = event => {
    this.setState({ message: event.target.value });
  }

  onFormSubmit = event => {
    event.preventDefault();
    this.setState({ message: '' });
    this.props.onMessageSend(this.state.message);
  }

  render() {
    console.log('render MessageForm');

    return (
      <Form reply onSubmit={this.onFormSubmit}>
        <Form.TextArea autoHeight rows="2" value={this.state.message} onChange={this.onMessageChange} /> 
        <Button content='Send' positive /> 
      </Form> 
    );
  }
}

export default MessageForm;
