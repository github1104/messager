import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Container, Card, Button, IconButton, Avatar } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import './style.css';

const Info = () => {
    const [image, setImage] = useState(null);

    const onChoosePhoto = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }

    }

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


    return (
        <Layout>
            <Container fixed >
                <div style={{ justifyContent: 'center', display: 'flex' }}>
                    <Card className="cardProfile" style={{ width: '70%', height: '80vh', marginTop: '2em' }}>
                        <div className="wrapAvatar" >
                            <div className="avatar">

                                <div>
                                    <Avatar alt="avatar" src={require('../../public/iconUser.png')} style={{ width: "120px", height: "120px" }} />
                                </div>
                                <IconButton className="upload" onClick={() => hiddenFileInput.current.click()}>
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
                        </div>
                        <div className="infoUser">
                            <div>
                                
                            </div>
                            <span>
                                hoangdz
                            </span>
                        </div>
                        <div>
                            linh tinh
                        </div>
                        <div className="bottom">
                            <div className="btnSave">
                                <Button color="primary" variant="contained" style={{marginRight:"1em"}}>
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

    )
}
export default Info;