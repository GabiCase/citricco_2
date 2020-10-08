import React from 'react'

import './ProfileDrop.css'

import { Link } from 'react-router-dom'

const ProductsDrop = () => {

    return (
        <>
            <ul className="nav__submenu">
                <li className="nav__submenu-item ">
                    <Link to="#">Aros</Link>
                </li>

                <li className="nav__submenu-item ">
                    <Link to="#">Colgantes</Link>
                </li>

                <li className="nav__submenu-item ">
                    <Link to="products/all">View all</Link>
                </li>



            </ul>
        </>
    )
}

export default ProductsDrop