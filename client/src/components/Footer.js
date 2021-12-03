import React from 'react';

const Footer = ({ currentPage, handlePageChange }) => {
    return(
        <div>
            <ul>
                <li>
            <a href="#about" onClick={() => handlePageChange('Testimonials')}>
           Testimonials
          </a>
          </li>
            </ul>
        </div>
    )
}


export default Footer;