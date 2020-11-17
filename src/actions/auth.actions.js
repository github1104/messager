import { auth, firestore } from "firebase";
import { authConstanst } from "./constants";
import { store } from 'react-notifications-component';
export const signup = (user) => {
  return async (dispatch) => {
    const db = firestore();

    dispatch({
      type: `${authConstanst.USER_LOGIN}_REQUEST`,
    });

    auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        console.log(data);
        const currentUser = auth().currentUser;
        currentUser
          .updateProfile({
            displayName: user.nameUser,
          })
          .then(() => {
            db.collection("users")
              .doc(data.user.uid)
              .set({
                nameUser: user.nameUser,
                uid: data.user.uid,
                createAt: new Date(),
                isOnline: true,
                avatar: null,
                isRead:[]
              })
              .then(() => {
                const loggedInUser = {
                  nameUser: user.nameUser,
                  uid: data.user.uid,
                  email: user.email,
                  avatar: null
                };
                localStorage.setItem("user", JSON.stringify(loggedInUser));
                console.log("User logged in successfully ...");
                

                store.addNotification({
                  title: "Nofication ",
                  message: "Login success",
                  type: "success",
                  insert: "top",
                  container: "top-right",
                  animationIn: ["animate__animated", "animate__fadeIn"],
                  animationOut: ["animate__animated", "animate__fadeOut"],
                  dismiss: {
                    duration: 5000,
                    onScreen: true
                  }
                })

                dispatch({
                  type: `${authConstanst.USER_LOGIN}_SUCCESS`,
                  payload: { user: loggedInUser },
                });
              })
              .catch((err) => {
                console.log(err);
                dispatch({ type: `${authConstanst.USER_LOGIN}_FAILURE` });
              });
          });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: `${authConstanst.USER_LOGIN}_FAILURE`,
          payload: { error: "2" },
        });
      });
  };
};

export const signin = (user) => {
  return async (dispatch) => {
    dispatch({ type: `${authConstanst.USER_LOGIN}_REQUEST` });

    auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {

        const user = firestore().collection("users").doc(data.user.uid);
        user.update({
            isOnline: true,
          })
          .then(() => {
            user.get()
            .then((doc)=>{
              let auth = doc.data()
              console.log(74,auth)
              localStorage.setItem("user", JSON.stringify(auth));

                  store.addNotification({
                  title: "Nofication ",
                  message: "Login success",
                  type: "success",
                  insert: "top",
                  container: "top-right",
                  animationIn: ["animate__animated", "animate__fadeIn"],
                  animationOut: ["animate__animated", "animate__fadeOut"],
                  dismiss: {
                    duration: 5000,
                    onScreen: true
                  }
                })

              dispatch({
                type: `${authConstanst.USER_LOGIN}_SUCCESS`,
                payload: { user: auth },
              });
            })

          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);

        dispatch({
          type: `${authConstanst.USER_LOGIN}_FAILURE`,
          payload: { error: "1" },
        });
      });
  };
};

export const isLoggedInUser = () => {
  return async (dispatch) => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

    if (user) {
      user.isOnline = true
      dispatch(setOnOff(user.uid,true))
      dispatch({  
        type: `${authConstanst.USER_LOGIN}_SUCCESS`,
        payload: { user },
      });
    } else {
      dispatch({
        type: `${authConstanst.USER_LOGIN}_FAILURE`,
        payload: { error: "Loggin again pls!" },
      });
    }
  };
};

export const logout = (uid) => {
  return async (dispatch) => {
    dispatch({
      type: `${authConstanst.USER_LOGOUT}_REQUEST`,
    });

    const db = firestore();
    db.collection("users")
      .doc(uid)
      .update({
        isOnline: false,
      })
      .then(() => {
        auth()
          .signOut()
          .then(() => {
            localStorage.clear();

            store.addNotification({
              title: "Nofication ",
              message: "Log out success",
              type: "warning",
              insert: "top",
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 5000,
                onScreen: true
              }
            })

            dispatch({ type: `${authConstanst.USER_LOGOUT}_SUCCESS` });
          })
          .catch((error) => {
            console.log(error);
            dispatch({
              type: `${authConstanst.USER_LOGOUT}_FAILURE`,
              payload: { error },
            });
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const setOnOff = (uid,status) => {
  return async (dispatch)=>{

    const user = firestore().collection("users").doc(uid);
    user
    .update({
      isOnline: status,
    })
    .then(()=>{

    })

  }
}
