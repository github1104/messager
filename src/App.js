import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input,IconButton } from '@material-ui/core';
import './App.css';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    db.collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() })))
      })
      }, [])

    useEffect(() => {
      setUserName(prompt('Enter your username'))
    }, [])

    const sendMessage = (event) => {
      event.preventDefault();

      db.collection('messages').add({
        message: input,
        username: userName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      setInput('');
    }

    return (
      <div className="App">
        <img src="https://www.logo.wine/a/logo/Facebook_Messenger/Facebook_Messenger-Logo.wine.svg" width="250px"/>
        <h2>Hi {userName}</h2>
        <form className="app__form">
          <FormControl className="app__formControl">
            <Input className="app__input" placeholder="Enter the message..." value={input} onChange={event => setInput(event.target.value)} />
            <IconButton className="app__iconButon" disabled={!input} type='submit' variant="contained" color="primary" onClick={sendMessage}>
              <SendIcon />
            </IconButton>
          </FormControl>
        </form>

        <FlipMove>
          {
            messages.map(({id, message}) => (
              <Message key={id} username={userName} message={message} />
            ))
          }

        </FlipMove>

      </div>
    );
  }

export default App;
