import { auth, firestore } from 'firebase'
import { authConstanst } from "./constants";
export const signup = (user) => {

    return async (dispatch) => {
        const db = firestore();

        dispatch({
            type: `${authConstanst.USER_LOGIN}_REQUEST`,
        })

        auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then(data => {
                console.log(data);
                const currentUser = auth().currentUser;
                currentUser.updateProfile({
                    displayName: user.nameUser,

                })
                    .then(() => {
                        db.collection('users').add({
                            nameUser: user.nameUser,
                            uid: data.user.uid,
                            createAt: new Date()
                        })
                            .then(() => {
                                const loggedInUser = {
                                    nameUser: user.nameUser,
                                    uid: data.user.uid,
                                    email: user.email
                                }
                                localStorage.setItem('user', JSON.stringify(loggedInUser))
                                console.log('User logged in successfully ...')
                                dispatch({
                                    type: `${authConstanst.USER_LOGIN}_SUCCESS`,
                                    payload: { user: loggedInUser }
                                })
                            })
                            .catch((err) => {
                                console.log(err)
                                dispatch({ type: `${authConstanst.USER_LOGIN}_FAILURE` })
                            })
                    });
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const signin = (user) => {

    return async dispatch => {

        dispatch({ type: `${authConstanst.USER_LOGIN}_REQUEST` });

        auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then((data) => {
                console.log(data)

                const userName = data.user.displayName;
                const loggedInUser = {
                    nameUser: userName,
                    uid: data.user.uid,
                    email: user.email
                }

                localStorage.setItem('user',JSON.stringify(loggedInUser));

                dispatch({
                    type: `${authConstanst.USER_LOGIN}_SUCCESS`,
                    payload:{user: loggedInUser}
                })


            })
            .catch((error) => {
                console.log(error)
            
                dispatch({
                    type: `${authConstanst.USER_LOGIN}_FAILURE`,
                    payload:{ error }
                })
            })
    }
}

export const isLoggedInUser = () => {
    return async dispatch => {

        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

        if(user){
            dispatch({
                type: `${authConstanst.USER_LOGIN}_SUCCESS`,
                payload: {user}
            })
        }else{
            dispatch({
                type: `${authConstanst.USER_LOGIN}_FAILURE`,
                payload: {error: 'Loggin again pls!'}
            })
        }

    }
}

export const logout = () => {
    return async dispatch => {
        dispatch({
            type: `${authConstanst.USER_LOGOUT}_REQUEST`
        });
        auth()
        .signOut()
        .then(()=>{
            localStorage.clear();
            dispatch({ type: `${authConstanst.USER_LOGOUT}_SUCCESS`})
        })
        .catch((error)=>{
            console.log(error);
            dispatch({ type: `${authConstanst.USER_LOGOUT}_FAILURE`,payload:{error}})
        })
    }
}