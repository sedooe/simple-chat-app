import React, { Component } from 'react';
import './App.css';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Comment, Grid, Header } from 'semantic-ui-react'
import FormWrapper from './FormWrapper';

const API_URL = process.env.REACT_APP_API_URL;

class App extends Component {

  stompClient;

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      currentMessage: '',
      messages: []
    };

    this.messagesRef = React.createRef();

    this._initWebSocketConnection();
  }

  _initWebSocketConnection = () => {
    const socket = new SockJS(`${API_URL}/chat`);
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, frame => {
      this._subscribeMessages();
    });
  }

  _subscribeMessages = () => {
    this.stompClient.subscribe('/messages', messageFrameObj => {
      const message = JSON.parse(messageFrameObj.body);
      if (message.name !== this.state.username) {
        this.setState({messages: [...this.state.messages, message]});
      }
    });
  }

  componentDidMount = () => {
    fetch(`${API_URL}/messages`)
    .then(response => response.json())
    .then(messages => this.setState({messages}));    
  }

  componentDidUpdate = () => {
    this._scrollToBottom();
  }

  _scrollToBottom = () => {
    this.messagesRef.current.scrollTop = this.messagesRef.current.scrollHeight;
  }

  onSignIn = username => {
    if (username) {
      this.setState({ username });
    }
  }

  onMessageSend = message => {
    if (!message) {
      return;
    }

    const newMessage = {
      id: '_' + Math.random().toString(36).substr(2, 9), // generating a temporary id. thanks: https://gist.github.com/gordonbrander/2230317,
      name: this.state.username,
      creationTime: Date.now(),
      message,
    }
    this.setState({messages: [...this.state.messages, newMessage]});
    this.stompClient.send("/chat/message", {}, JSON.stringify(newMessage));
  }

  render() {
    console.log('render App');

    const messages = this.state.messages.map(message => (
      <Comment key={message.id}>
        <Comment.Content>
          <Comment.Author as='a'>{message.name}</Comment.Author>
          <Comment.Metadata>
            <div>{new Date(message.creationTime).toLocaleString()}</div>
          </Comment.Metadata>
          <Comment.Text>{message.message}</Comment.Text>
        </Comment.Content>
      </Comment>
    ));

    return (
      <Grid centered columns={4}>
        <Grid.Row>
          <Grid.Column>
            <Comment.Group>
              <Header as='h3' dividing>
                Chat
              </Header>
              <div className="messages" ref={this.messagesRef}>
                {!messages.length ? <em>No messages yet.</em> : messages}
              </div>
            </Comment.Group>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <FormWrapper onSignIn={this.onSignIn} onMessageSend={this.onMessageSend} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default App;
