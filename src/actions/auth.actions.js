import {auth, firestore} from 'firebase'
import { authConstanst } from "./constants";
export const signup = (user) => {

    return async (dispatch) => {
        const db = firestore();

        dispatch({
            type: `${authConstanst.USER_LOGIN}_REQUEST`,
        })

        auth()
        .createUserWithEmailAndPassword(user.email,user.password)
        .then(data=>{
            console.log(data);
            const currentUser = auth().currentUser;
            currentUser.updateProfile({
                displayName: user.nameUser,

            })
            .then(()=>{
                    db.collection('users').add({
                        nameUser: user.nameUser,
                        uid: data.user.uid,
                        createAt: new Date()
                    })
                    .then(()=>{
                        const loggedInUser = {
                            nameUser: user.nameUser,
                            uid: data.user.uid,
                            email: user.email
                        }
                        localStorage.setItem('user',JSON.stringify(loggedInUser))
                        console.log('User logged in successfully ...')
                        dispatch({
                            type: `${authConstanst.USER_LOGIN}_SUCCESS`,
                            payload: { user: loggedInUser }
                        })
                    })
                    .catch((err)=>{
                        console.log(err)
                        dispatch({ type: `${authConstanst.USER_LOGIN}_FAILURE`})
                    })
            });
        })
        .catch(err =>{
            console.log(err);
        })
    }
}