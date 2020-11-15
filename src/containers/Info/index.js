import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Container, Card, Button, IconButton, Avatar } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import './style.css';
import { upLoadImageUrl, updateUser } from '../../actions/user.actions';
import defaultAvt from '../../public/iconUser.png'
import { css } from "@emotion/core";
import { MoonLoader } from "react-spinners";

const Info = () => {
    const auth = useSelector((state) => state.auth);
    const [imageAvt, setImage] = useState(null);
    const [imageCover, setImageCover] = useState(null);
    const [urlImage, setUrlImage] = useState(auth.avatar);
    const [urlCover, setUrlCover] = useState(auth.imageCover);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (auth) {
            setUrlImage(auth.avatar)
            setUrlCover(auth.imageCover)
            setLoading(false)
        }
    }, [auth])

    useEffect(()=>{
        let time = setTimeout(()=>setLoading(false),5000)
        return () =>{
            clearTimeout(time)
        }
    },[loading])
    const override = css`
    display: block;
    margin: auto;
    border-color: red;
   `;
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
            setImageCover(img)
            let src = URL.createObjectURL(img)
            setUrlCover(src)
        }
    }

    const saveChange = async () => {
        setLoading(true)
        let user = {
            avatar: imageAvt,
            imageCover: imageCover
        }
        console.log(loading)
        dispatch(updateUser(auth.uid, user))
      
        
    }

    const hiddenFileInput = React.useRef(null);
    const hiddenFileInputCover = React.useRef(null);

    return (
        <Layout>
            <div className="container" >
                <Card className="cardProfile" >
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
                            đổi ảnh nền
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
                                        <input value={auth.nameUser} style={{ borderWidth: '0', color: 'black' }}></input>
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
                                {
                                    loading ?
                                        <div style={{ height: '80%', display: 'flex' }}>
                                            <MoonLoader
                                                css={override}
                                                size={45}
                                                color={"#293d3d"}
                                                loading={true}
                                            />
                                        </div>
                                        :
                                        <div className="btnSave">
                                            <Button color="primary" variant="contained" style={{ marginRight: "1em" }}
                                                onClick={saveChange}
                                            >
                                                Save
                                            </Button>
                                                    <Button color="inherit" variant="contained" >
                                                        Cancel
                                            </Button>
                                        </div>
                                }

                            </div>
                        </div>
                    </div>


                </Card>
            </div>
        </Layout>
    );
};
export default Info;
