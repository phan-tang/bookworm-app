import React from 'react';
import 'react-dom';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.scss';
import bookworm_icon from '../../../../assets/bookworm_icon.svg';

function Header() {
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
    return (
        <div className="navbar fixed-top navbar-light bg-light">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand">
                        <img src={bookworm_icon} alt="" />
                    </a>
                    <span>BOOKWORM</span>
                </div>
                <ul className="nav nav-pills">
                    <HeaderLink to='/'>Home</HeaderLink>
                    <HeaderLink to='/shop'>Shop</HeaderLink>
                    <HeaderLink to='/about'>About</HeaderLink>
                    <HeaderLink to='/cart'>Cart <span className="badge">3</span></HeaderLink>
                </ul>
            </div>
        </div>
    );
}

export default Header;