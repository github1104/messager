import React, { useEffect, useState } from 'react';
import './style.css';
import Layout from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getRealtimeConversations, getRealtimeUsers, updateMessage } from '../../actions/user.actions';

const User = (props) => {

  const { user, onClick } = props;
  return (
    <div onClick={() => onClick} className="displayName" key={user.uid}>
      <div className="displayPic">
        <img src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg" alt="" />
      </div>
      <div style={{ flex: 1, justifyContent: 'space-between', display: 'flex', margin: '0 10px' }}>
        <span style={{ fontWeight: 500 }}>{user.nameUser}</span>
        <span>{user.isOnline ? 'Online' : 'Offline'}</span>
      </div>
    </div>
  )
}

const HomePage = (props) => {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState('');
  const [message, setMessage] = useState('');
  const [userUid, setUserUid] = useState(null);
  let unsubcribe;


  useEffect(() => {

    unsubcribe = dispatch(getRealtimeUsers(auth.uid))
      .then(unsubcribe => {
        console.log(37, unsubcribe)
        return unsubcribe;
      })
      .catch(error => {
        console.log(error);
      })


  }, [])

  //componentWillUnmount
  useEffect(() => {
    return () => {
      console.log(48, unsubcribe)
      unsubcribe.then(f => f()).catch(error => console.log(error));

    }
  }, [])



  const initChat = (user) => {
    setChatStarted(true);
    setChatUser(user.nameUser);
    setUserUid(user.uid);

    dispatch(getRealtimeConversations({uid_1:auth.uid,uid_2:user.uid}))
  }

  const submitMessage = (e) => {
    const msgObject = {
      user_uid_1: auth.uid,
      user_uid_2: userUid,
      message
    }

    if (message !== "") {
      dispatch(updateMessage(msgObject));
    }

    // console.log(72,msgObject)
  }

  return (
    <Layout>
      <section className="container">
        <div className="listOfUsers">
          {
            user.users.length > 0 ?
              user.users.map(user => {

                return (
                  <div onClick={() => initChat(user)} className="displayName" key={user.uid}>
                    <div className="displayPic">
                      <img src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg" alt="" />
                    </div>
                    <div style={{ flex: 1, justifyContent: 'space-between', display: 'flex', margin: '0 10px' }}>
                      <span style={{ fontWeight: 500 }}>{user.nameUser}</span>
                      <span className={user.isOnline ? `onlineStatus` : `onlineStatus off`}></span>
                    </div>
                  </div>
                );
              })

              : null
          }
        </div>

        <div className="chatArea">
          <div className="chatHeader">
            {
              chatStarted ? chatUser : null
            }
          </div>
          <div className="messageSections">
            {
              chatStarted ?
                user.conversations.map(con => 
                  <div style={{ textAlign: con.user_uid_1 == auth.uid ? 'right' : 'left' }} >
                    <p className="messageStyle" >{con.message}</p>
                  </div>
                )
                : null
            }


          </div>
          {
            chatStarted ?
              <div className="chatControls">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="write message"
                />
                <button onClick={submitMessage}>Send</button>
              </div>
              : null
          }

        </div>
      </section>
    </Layout>

  );
}

export default HomePage;