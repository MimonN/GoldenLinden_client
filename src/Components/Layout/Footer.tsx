import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="footer position-absolute bottom-0 w-100 text-center p-3 bg-dark text-white">
      &copy; 2023 | Made with <i className="bi bi-heart-fill"></i> by{' '}
      <Link className='fw-bold' to="https://www.linkedin.com/in/mykhailo-nedilskyi/">
        Mykhailo Nedilskyi
      </Link>
    </div>
  );
}

export default Footer;
