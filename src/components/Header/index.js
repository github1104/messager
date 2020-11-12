import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions'
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';

const Header = (props) => {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    return (
        <header className="header">
            <div style={{ display: 'flex' }}>
                <div className="logo" >
                    <NavLink to={'/'}>Web Messenger</NavLink>
                </div>
                {/* <div className="search">
                    <div className="searchIcon">
                        <SearchIcon />
                    </div>
                   
                </div> */}
                {
                    !auth.authenticated ?
                        <ul className="leftMenu">
                            <li><NavLink to={'/login'}>Login</NavLink></li>
                            <li><NavLink to={'/signup'}>Sign up</NavLink></li>
                        </ul>
                        : null
                }

            </div>


            {auth.authenticated ?
                <ul className="menu">
                    <Link to={'/Info'} style={{ textDecoration: 'none' }}>
                        <div style={{color: '#fff', fontWeight: 'bold', display: 'flex'}}>
                            <Avatar alt="avatar" style={{ bottom: '6px', marginRight: '6px' }} />
                            <div >{auth.nameUser}</div>
                        </div>
                    </Link>
                    <li style={{ marginLeft: 20 }}>
                        <Link to={'#'} onClick={() => {
                            dispatch(logout(auth.uid));
                        }}>Logout</Link>
                    </li>

                </ul> : null}

        </header>
    )

}

export default Header