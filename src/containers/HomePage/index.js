import React, { useEffect, useState } from 'react';
import './style.css';
import Layout from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getRealtimeConversations, getRealtimeUsers, updateMessage } from '../../actions/user.actions';
import { storage } from "firebase";
import ImageIcon from '@material-ui/icons/Image';
import SendIcon from '@material-ui/icons/Send';
import ListUser from '../../components/ListUser';
import * as Scroll from 'react-scroll';
import { userConstants } from '../../actions/constants';

const HomePage = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState("");
  const [message, setMessage] = useState("");
  const [userUid, setUserUid] = useState(null);
  const [image, setImage] = useState(null);
  const [previewImg, setPreImg] = useState(null);
  const [isImageLoaded, setIsLoaded] = useState(false);

  let unsubcribe;
  let scroll = Scroll.animateScroll;

  useEffect(() => {
    console.log(36, auth);
    if (auth) {
      unsubcribe = dispatch(getRealtimeUsers(auth.uid))
    }

  }, []);

  useEffect(() => {
    if (chatStarted) {
      scrollToBottom()
    }
  }, [user])

  //componentWillUnmount
  useEffect(() => {
    return () => {
      if (unsubcribe) {
        console.log(48);
        unsubcribe.then((f) => f())
          .catch((error) => console.log(error));
      }
    }
  }, []);

  const initChat = (user) => {
    setChatStarted(true);
    setChatUser(user.nameUser);
    setUserUid(user.uid);
    dispatch(getRealtimeConversations({ uid_1: auth.uid, uid_2: user.uid }))
  }

  const submitMessage = (e) => {
    if (image) {
      upLoadPhoto();
    }

    if (message !== "" && !image) {
      let msgObject = {
        user_uid_1: auth.uid,
        user_uid_2: userUid,
        message,
        url: null,
        isView: false,
        createdAt: new Date()
      }
      let conversations = [...user.conversations, msgObject]
      dispatch({
        type: userConstants.ADD_REALTIME_MESSAGES,
        payload: { conversations }
      })
      dispatch(updateMessage(msgObject));

    }

    setMessage("");

  }

  const onChoosePhoto = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
      let src = URL.createObjectURL(e.target.files[0])
      setPreImg(src)
    }

  }

  const upLoadPhoto = () => {
    const store = storage()
    var uploadTask = store.ref(`images/${image.name}`).put(image);
    setPreImg(null);
    uploadTask.on(
      'state_changed',
      snapshot => { },
      error => {
        console.log(error);
      },
      () => {
        store
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            let msgObject = {
              user_uid_1: auth.uid,
              user_uid_2: userUid,
              message,
              url,
              isView: false,
              createdAt: new Date()
            };
            let conversations = [...user.conversations, msgObject]
            dispatch({
              type: userConstants.ADD_REALTIME_MESSAGES,
              payload: { conversations }
            })
            dispatch(updateMessage(msgObject));
          });
      }
    )
  }
  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    console.log('scroll')
  };

  const hiddenFileInput = React.useRef(null);
  const bottomRef = React.useRef(null);

  return (
    <Layout>
      <section className="container">
        <div className="listOfUsers">
          {user.users.length > 0
            ? user.users.map((user) => {
              return (
                <div onClick={() => initChat(user)} key={user.uid}>
                  <ListUser name={user.nameUser} isOnline={user.isOnline} avatar={require('../../public/iconUser.png')}
                    style={{ background: '#3B4257', color: 'white' }}
                  />
                </div>
              );
            })
            : null}
        </div>
        {chatStarted ?
          <div className="chatArea">
            <div className="chatHeader" >
              {chatUser}
            </div>
            <div className="messageSections">
              {
                user.conversations.map(con =>
                  <div
                    style={{ textAlign: con.user_uid_1 == auth.uid ? 'right' : 'left' }}
                  >
                    {con.url &&
                      <div className="imageChat">
                        <img
                          src={con.url}
                        />
                      </div>}
                    {con.message && <p className={con.user_uid_1 == auth.uid ? "messageStyleAuth" : "messageStyleUser"} >{con.message}</p>}

                  </div>
                )
              }
              <div ref={bottomRef}></div>
            </div>

            <div className="chatControls">
              {
                previewImg ?
                  <div className="previewImg">
                    <img src={previewImg}
                      width="100px"
                      style={{ borderRadius: '20%', margin: '2px' }}
                    ></img>
                    <button onClick={() => {
                      setPreImg(null)
                      setImage(null)
                    }}>x</button>
                  </div>

                  : null
              }
              <input
                onClick={() => scrollToBottom()}
                className="chatText"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="write message"
              />
              <input
                ref={hiddenFileInput}
                style={{ display: 'none' }}
                accept="image/*"
                className="viewInputGallery"
                type="file"
                onChange={onChoosePhoto}
              />
              <div className="chatbtn">
                <button
                  onClick={() => hiddenFileInput.current.click()}
                  style={{ marginRight: '4px' }}
                >
                  <ImageIcon style={{ fontSize: 40, color: 'black' }} />
                </button>
                <button
                  onClick={submitMessage}
                  style={{ marginRight: '4px' }}
                >
                  <SendIcon style={{ fontSize: 40, color: 'black' }} />
                </button>
              </div>
            </div>
          </div>
          :
          <div className="chatArea">
            <div className="defaultAreaChat">
              <img src={require('../../public/chat.png')}></img>
            </div>
          </div>

        }

      </section>
    </Layout>
  );
};

export default HomePage;
