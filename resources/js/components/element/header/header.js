import { React, useState } from 'react';
import 'react-dom';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.scss';
import bookworm_icon from '../../../../assets/bookworm_icon.svg';
import bookworm_icon_white from '../../../../assets/bookworm_icon_white.svg';
import Login from '../login/login';
import { toast } from 'react-toastify';

function Header(props) {

    //Custom link of navbar
    const HeaderLink = ({ children, to, ...props }) => {
        const resolved = useResolvedPath(to)
        const match = useMatch({ path: resolved.pathname, end: true })
        return (
            <li className='nav-item'>
                <Link to={to} {...props} className={match ? 'nav-link active' : 'nav-link'}>
                    {children}
                </Link>
            </li>
        )
    }

    //Function used to logout
    const handleLogout = async () => {
        let accessToken = props.userInformation.remember_token;
        await axios.get('api/logout', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then((response) => {
                toast.success("Logged out successfully!");
                localStorage.clear();
                props.setUserInformation(null);
                props.setShow(false);
            })
            .catch(error => console.log(error));
    }

    //Function used to display login button or user's name
    const displayUser = () => {
        if (props.userInformation == null) {
            return (
                <li className='nav-item'>
                    <button className='nav-link' onClick={() => props.setShow(true)}>
                        Login
                    </button>
                </li>
            );
        }
        return (
            <li className='nav-item'>
                <span className="dropdown">
                    <button className="dropdown-button nav-link" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {props.userInformation.full_name}
                    </button>
                    <ul className="dropdown-menu">
                        <button className='nav-link dropdown-item' onClick={() => handleLogout()}>Logout</button>
                    </ul>
                </span>
            </li>
        );
    }

    return (
        <div className="navbar fixed-top">
            <div className="container-fluid navbar">
                <div className="navbar-header">
                    <a className="navbar-brand">
                        <img src={bookworm_icon_white} alt="" />
                    </a>
                    <span>BOOKWORM</span>
                </div>
                <ul className="nav nav-pills">
                    <HeaderLink to='/'>Home</HeaderLink>
                    <HeaderLink to='/shop'>Shop</HeaderLink>
                    <HeaderLink to='/about'>About</HeaderLink>
                    <HeaderLink to='/cart'>Cart <span className="badge">{props.numberOfBooks}</span></HeaderLink>
                    {displayUser()}
                </ul>
            </div>
        </div>
    );
}

export default Header;