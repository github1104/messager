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
                        db.collection('users')
                        .doc(data.user.uid)
                        .set({
                            nameUser: user.nameUser,
                            uid: data.user.uid,
                            createAt: new Date(),
                            isOnline: true
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
                dispatch({
                    type: `${authConstanst.USER_LOGIN}_FAILURE`,
                    payload: {error: '2'}
                })
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


                const db = firestore();
                db.collection('users')
                .doc(data.user.uid)
                .update({
                    isOnline:true
                })
                .then(()=>{
                    const userName = data.user.displayName;
                    const loggedInUser = {
                        nameUser: userName,
                        uid: data.user.uid,
                        email: user.email,
                    }
    
                    localStorage.setItem('user',JSON.stringify(loggedInUser));
    
                    dispatch({
                        type: `${authConstanst.USER_LOGIN}_SUCCESS`,
                        payload:{user: loggedInUser}
                    })
                })
                .catch((error)=>{
                    console.log(error)
                })

               


            })
            .catch((error) => {
                console.log(error)
            
                dispatch({
                    type: `${authConstanst.USER_LOGIN}_FAILURE`,
                    payload:{ error: '1' }
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

export const logout = (uid) => {
    return async dispatch => {
        dispatch({
            type: `${authConstanst.USER_LOGOUT}_REQUEST`
        });

        const db = firestore();
        db.collection('users')
        .doc(uid)
        .update({
            isOnline: false
        })
        .then(()=>{
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
        })
        .catch((error)=>{
            console.log(error)
        })

       
    }
}