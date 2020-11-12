import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Container, Card, Button, IconButton, Avatar } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { useSelector } from 'react-redux';
import './style.css';
import defaultAvt from '../../public/iconUser.png'
const Info = () => {
    const [image, setImage] = useState(null);
    const [urlImage, setUrlImage] = useState(defaultAvt);
    const [urlCover, setUrlCover] = useState(null);
    const auth = useSelector(state => state.auth);


    const onChoosePhoto = (e) => {
        let img = e.target.files[0]
        if (img) {
            setImage(img)
            let src = URL.createObjectURL(img)
            setUrlImage(src)
        }

    }

    const onChoosePhotoCover = (e) => {
        let img = e.target.files[0]
        if (img) {
            setImage(img)
            let src = URL.createObjectURL(img)
            setUrlCover(src)
        }
    }
    const onChoosePhoto = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    //    const upLoadPhoto = () => {
    //     const store = storage()
    //     var uploadTask = store.ref(`images/${image.name}`).put(image);
    //     uploadTask.on(
    //       'state_changed',
    //       snapshot => {},
    //       error =>{
    //         console.log(error);
    //       },
    //       ()=>{
    //         store
    //           .ref("images")
    //           .child(image.name)
    //           .getDownloadURL()
    //           .then((url)=>{
    //             let msgObject = {
    //               user_uid_1: auth.uid,
    //               user_uid_2: userUid,
    //               message,
    //               url
    //             }
    //             dispatch(updateMessage(msgObject));
    //           })
    //       }
    //     )
    //   }

    const hiddenFileInput = React.useRef(null);
    const hiddenFileInputCover = React.useRef(null);

    return (
        <Layout>
            <Container fixed >
                <div style={{ justifyContent: 'center', display: 'flex' }}>
                    <Card className="cardProfile" style={{ width: '70%', height: '80vh', marginTop: '2em' }}>
                        <div className="wrapAvatar"
                            style={{ backgroundImage: `url(${urlCover})` }}
                        >
                            <div className="avatar">
                                <div className="avtImg" style={{
                                    backgroundImage: `url(${urlImage})`
                                }}>
                                    {/* <Avatar alt="avatar" src={urlImage ? urlImage  :require('../../public/iconUser.png')} style={{ width: "120px", height: "120px" }} /> */}
                                </div>
                                <IconButton
                                    onClick={() => hiddenFileInput.current.click()}
                                    style={{ backgroundColor: 'white', border: 'solid', borderColor: 'black', bottom: '1em' }}
                                    size="small"
                                >
                                    <input
                                        ref={hiddenFileInput}
                                        style={{ display: 'none' }}
                                        accept="image/*"
                                        className="viewInputGallery"
                                        type="file"
                                        onChange={onChoosePhoto}
                                    />
                                    <PhotoCamera style={{ color: 'black' }} />
                                    {/* <img alt="avatar" src={require('../../public/iconCamera.png')} color="#fff" /> */}
                                </IconButton>
                            </div>
                            <button style={{ position: 'absolute', right: '1em', bottom: '1em' }}
                                onClick={() => hiddenFileInputCover.current.click()}
                            >
                                đổi ảnh bìa
                                <input
                                    ref={hiddenFileInputCover}
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                    className="viewInputGallery"
                                    type="file"
                                    onChange={onChoosePhotoCover}
                                />
                            </button>
                            <button style={{ position: 'absolute', left: '1em', bottom: '1em' }}

                            >
                                Thêm bạn bè
                            </button>
                        </div>
                        <div className="wrapInfoUser">
                            <div className="infoUser">
                                <div className="follow">
                                    <div style={{ borderRight: "#000", width: '50%' }}>
                                        <div style={{ fontWeight: 'bold' }}>follower</div>
                                        <div>999</div>
                                    </div>
                                    <hr style={{ height: '2em' }} />
                                    <div style={{ borderRight: "#000", width: '50%' }}>
                                        <div style={{ fontWeight: 'bold' }}>follow</div>
                                        <div>999</div>
                                    </div>
                                </div>
                                <hr />
                                <div className="profile">
                                    <div className="labelRow">
                                        <div className="labelLeft">
                                            <label>Name</label>

                                        </div>
                                        <div className="labelRight">
                                            <input value={auth.nameUser} style={{ borderWidth: '0' }}></input>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="labelRow">
                                        <div className="labelLeft">
                                            <label>Email</label>

                                        </div>
                                        <div className="labelRight">
                                            <input value={auth.email} style={{ borderWidth: '0' }}></input>

                                        </div>
                                    </div>
                                    <hr />
                                    <div className="labelRow">
                                        <div className="labelLeft">
                                            <label>Date</label>

                                        </div>
                                        <div className="labelRight">

                                            <input value="11/04/1998" style={{ borderWidth: '0' }}></input>

                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                        </div>

                        <div className="bottom">
                            <div className="btnSave">
                                <Button color="primary" variant="contained" style={{ marginRight: "1em" }}>
                                    Save
                                </Button>
                                <Button color="inherit" variant="contained" >
                                    Cancel
                                </Button>
                            </div>

                        </div>
                    </Card>
                </div>
            </Container>
        </Layout>
    );
};
export default Info;
