import { userConstants, authConstanst } from './constants';
import { firestore, storage } from 'firebase';


export const getRealtimeUsers = (uid) => {

    return async (dispatch) => {

        dispatch({ type: `${userConstants.GET_REALTIME_USERS}_REQUEST` })


        const db = firestore();
        const unsubcribe = db.collection("users")
            // .where("state","==","CA")
            .onSnapshot((querySnapshot) => {
                let users = [];
                querySnapshot.forEach(function (doc) {

                    if (doc.data().uid !== uid) {
                        users.push(doc.data());
                    } else {

                    }

                });

                // console.log(25, users);
                dispatch({
                    type: `${userConstants.GET_REALTIME_USERS}_SUCCESS`,
                    payload: { users }
                });

            });
        return unsubcribe;

    }
};

export const updateMessage = (msgObj) => {
    console.log('updateMessage')
    return async dispatch => {

        const db = firestore();
        let conversations = {
            ...msgObj,
            isView: false,
            createdAt: new Date()
        }
        db.collection('conversations')
            .add(conversations)
            .then(() => {
                // console.log(data)
                //success

            })
            .catch((error) => {
                console.log(error)
                // dispatch({
                //     type: `${userConstants.ADD_REALTIME_MESSAGES}_FAILURE`,

                // })
            });
    }
}

export const updateUser = (uid, userObject) => {
    console.log('updateUser', userObject)
    return async (dispatch) => {
        const db = firestore();
        const urlAvt = await upLoadImageUrl(userObject.avatar)
        const urlCover = await upLoadImageUrl(userObject.imageCover)
        let user;
        if (urlAvt && urlCover) {
            user = {
                avatar: urlAvt,
                imageCover: urlCover
            }
        }
        else if (urlAvt) {
            user = {
                avatar: urlAvt,
            }
        }
        else if (urlCover) {
            user = {
                imageCover: urlCover
            }
        } else{
            return
        }

        await db.collection("users")
            .doc(uid)
            .update(user)
            .then(() => {
                let user = JSON.parse(localStorage.getItem("user"))
                if (urlAvt && urlCover) {
                    user = {
                        ...user,
                        avatar: urlAvt,
                        imageCover: urlCover
                    }
                }
                else if (urlAvt) {
                    user = {
                        ...user,
                        avatar: urlAvt,
                    }
                }
                else if (urlCover) {
                    user = {
                        ...user,
                        imageCover: urlCover
                    }
                }
                localStorage.setItem("user", JSON.stringify(user));
                dispatch({
                    type: `${authConstanst.USER_LOGIN}_SUCCESS`,
                    payload: { user },
                });
            })
            .catch((err) => {
                console.log(err)
            })
    }

}

export const getRealtimeConversations = (user) => {

    return async (dispatch) => {

        const db = firestore();
        const unsubcribe = db.collection('conversations')
            .where('user_uid_1', 'in', [user.uid_1, user.uid_2])
            .orderBy('createdAt', 'asc')
            .onSnapshot((querySnapshot) => {
                const conversations = [];

                querySnapshot.forEach(doc => {

                    if (doc.data().user_uid_1 == user.uid_1 && doc.data().user_uid_2 == user.uid_2
                        || doc.data().user_uid_1 == user.uid_2 && doc.data().user_uid_2 == user.uid_1) {
                        conversations.push(doc.data())
                    }


                })
                if (conversations.length > 0) {
                    dispatch({
                        type: userConstants.GET_REALTIME_MESSAGES,
                        payload: { conversations }
                    })
                } else {
                    dispatch({
                        type: `${userConstants.GET_REALTIME_MESSAGES}_FAILURE`,
                        payload: { conversations }
                    })
                }
                // console.log(conversations);

            });
        return unsubcribe;
    }
}

export const upLoadImageUrl = (image) => {
    const store = storage()
    if (image) {
        var uploadTask = store.ref(`images/${image.name}`).put(image);
        return new Promise((res, rej) => {
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
                            console.log(url)
                            res(url)
                        })
                        .catch((err) => rej(err))
                }
            )
        })
    }
    return
}
