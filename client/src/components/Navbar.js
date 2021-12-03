import React from 'react';
import { Link } from 'react-router-dom';


// import Auth from '../utils/auth';

const Nav = () => {
    return(
        <div>
            <ul>
                <li>
                    <Link to="/about">
                        About
                    </Link>
                </li>
                <li>
                    <Link to="/contact">
                        Contact
                    </Link>
                </li>
                <li>
                    <Link to="/mygarden">
                        mygarden
                    </Link>
                </li>
                <li>
                    <Link to="/about">
                        About
                    </Link>
                </li>
            </ul>
        </div>
    )
}


export default Nav;