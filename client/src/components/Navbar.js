import React from 'react';
import { Link } from 'react-router-dom';


import Auth from '../utils/auth';

const Nav = ({ currentPage, handlePageChange }) => {
    return(
        <div>
            <ul>
                <li>
            <a href="#about" onClick={() => handlePageChange('About')}>
           About
          </a>
          </li>
                <li>
                <a  href="#contact" onClick={() => handlePageChange('Contact')}>
            Contact 
          </a>
                </li>
                <li>
                <a  href="#contact" onClick={() => handlePageChange('Team')}>
            Meet The Team 
          </a>
          </li>
            </ul>
        </div>
    )
}


export default Nav;