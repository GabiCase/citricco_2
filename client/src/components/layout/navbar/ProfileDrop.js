import React from 'react'

import './ProfileDrop.css'

import { Link } from 'react-router-dom'

const ProfileDrop = () => {

    return (
        <>
            <ul className="nav__submenu">
                <li className="nav__submenu-item ">
                    <Link to="/account/profile">My profile</Link>
                </li>

                <li className="nav__submenu-item ">
                    <Link to="account/orderhistory">Order history</Link>
                </li>

                <li className="nav__submenu-item ">
                    <Link to="account/whislist">My whislist</Link>
                </li>

                <li className="nav__submenu-item ">
                    <Link to="account/logout">Logout</Link>
                </li>

            </ul>
        </>
    )
}

export default ProfileDrop