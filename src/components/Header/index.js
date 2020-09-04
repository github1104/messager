import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import {logout} from '../../actions'

const Header = (props) => {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    return (
        <header className="header">
            <div style={{ display: 'flex' }}>
                <div className="logo">Web Messenger</div>
                {
                    !auth.authenticated ?
                        <ul className="leftMenu">
                            <li><NavLink to={'/login'}>Login</NavLink></li>
                            <li><NavLink to={'/signup'}>Sign up</NavLink></li>
                        </ul>
                        : null
                }

            </div>
            <div style={{ margin: '20px 0', color: '#fff', fontWeight: 'bold' }}>{auth.authenticated ? `Hi ${auth.nameUser}` : null}</div>
            {auth.authenticated ? 
            <ul className="menu">
                <li>
                    <Link to={'#'} onClick={()=>{
                        dispatch(logout());
                    }}>Logout</Link>
                </li>
            </ul> : null}

        </header>
    )

}

export default Header