import React, { useEffect, useState } from 'react';
import './style.css';
import Layout from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getRealtimeConversations, getRealtimeUsers, updateMessage, Readed } from '../../actions/user.actions';
import { setOnOff } from '../../actions'
import { storage } from "firebase";
import ImageIcon from '@material-ui/icons/Image';
import SendIcon from '@material-ui/icons/Send';
import ListUser from '../../components/ListUser';
import * as Scroll from 'react-scroll';
import { css } from "@emotion/core";
import { MoonLoader } from "react-spinners";

import { store } from 'react-notifications-component';
// import { userConstants } from '../../actions/constants';

const HomePage = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const userLocal = JSON.parse(localStorage.getItem("user"))

  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState("");
  const [message, setMessage] = useState("");
  const [userUid, setUserUid] = useState(null);
  const [image, setImage] = useState(null);
  const [previewImg, setPreImg] = useState(null);
  const [textSearch, setTextSearch] = useState("");
  const [allowedNofi, setAllowed] = useState(true)
  

  const users = useSelector((state) => state.user.users.filter((u) => u.nameUser.search(textSearch) > -1));
  const override = css`;

    display: block;
    margin: auto;
    border-color: red;
  `;
  let unsubcribe;
  let unsubMsg;
  let scroll = Scroll.animateScroll;
  // remove listener from realtme database
  useEffect(() => {
    console.log(36, auth);
    audioRef.current.play();
    if (auth) {
      window.addEventListener("beforeunload", (e) => {
        console.log(48, 'log out')
        dispatch(setOnOff(auth.uid, false));
      })
      window.addEventListener('unload', function (event) {
        console.log(53, 'log out')
        dispatch(setOnOff(auth.uid, false));
      });
      unsubcribe = dispatch(getRealtimeUsers(auth.uid))
    }
    return () => {
      if (unsubcribe) {
        // console.log('unsubcribe',unsubcribe);
        unsubcribe.then((f) => f())
          .catch((error) => console.log(error));
      }
    }

  }, []);
  //remove listener from realtme database
  useEffect(() => {
    if (userUid) {
      console.log(60)
      unsubMsg = dispatch(getRealtimeConversations({ uid_1: auth.uid, uid_2: userUid }))
      dispatch(Readed({ uid_1: auth.uid, uid_2: userUid }))
    }
    return () => {
      if (unsubMsg) {

        unsubMsg.then((f) => f())
          .catch((error) => console.log(error));
      }
    }
  }, [userUid]);


  useEffect(() => {
    
    if (chatStarted) {
      let time = setTimeout(() => scrollToBottom(), 1200)
      if(user.conversations.length >0 && user.conversations[user.conversations.length-1].user_uid_1 !== auth.uid)
      audioRef.current.play();
      return () => {
        clearTimeout(time)
      }
    }

  }, [user.conversations])

  
  useEffect(()=>{
    // console.log(91,userLocal)
   
  },[userLocal])

  const initChat = (user) => {

    if (user.isRead.length > 0) {
      user.isRead.map((u) => {
        if (u.id === auth.uid && !u.isReaded) {
          console.log(107, u)
          dispatch(Readed({ uid_1: u.id, uid_2: user.uid}))
        }

      })
    }
    setChatStarted(true);
    setChatUser(user.nameUser);
    setUserUid(user.uid);


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
      // let conversations = [...user.conversations, msgObject]
      // dispatch({
      //   type: userConstants.ADD_REALTIME_MESSAGES,
      //   payload: { conversations }
      // })
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
            // let conversations = [...user.conversations, msgObject]
            // dispatch({
            //   type: userConstants.ADD_REALTIME_MESSAGES,
            //   payload: { conversations }
            // })
            dispatch(updateMessage(msgObject));
          });
      }
    )
  }

  const searchHandle = (e) => {
    setTextSearch(e.target.value);

  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log('press enter');
      submitMessage()
    }
  }
  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const hiddenFileInput = React.useRef(null);
  const bottomRef = React.useRef(null);
  const audioRef = React.useRef(null);
  return (
    <Layout>
      <section className="container">
        <div className="listOfUsers">
          <div className="wrapperSearch">
            <div >
              <img src={require('../../public/search.png')} ></img>
            </div>
            <input placeholder="Search " value={textSearch} onChange={(e) => searchHandle(e)} />
          </div>
          {users.length > 0
            ? users.map((user) => {
              let isReaded = true
              if (user.isRead.length > 0) {
                user.isRead.map((u) => {
                  if (u.id === auth.uid) isReaded = u.isReaded
                })
              }
              return (
                <div onClick={() => initChat(user)} key={user.uid}>
                  <ListUser name={user.nameUser} isOnline={user.isOnline}
                    avatar={user.avatar} isReaded={isReaded} />
                </div>
              );
            })
            :
            <div style={{ height: '80%', display: 'flex' }}>
              <MoonLoader
                css={override}
                size={150}
                color={"#ccc"}
                loading={true}
              />
            </div>

          }
        </div>
        {chatStarted ?
          <div className="chatArea">
            <div className="chatHeader" >
              {chatUser}
            </div>
            <div className="messageSections">
              {
                user.conversations.length > 0 ?
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
                  :

                  <div className="defaultAreaChat">
                    <img src={require('../../public/chat.png')}></img>
                    <h1 style={{ color: '#ccc' }}>Let's chat!</h1>
                  </div>

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
                onKeyDown={(e)=>handleKeyDown(e)}
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
        <audio    
            ref={audioRef}
            src={require('../../public/audio/messenger.mp3')}

        >
        </audio>
      </section>
    </Layout>
  );
};

export default HomePage;
