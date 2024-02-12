// Navbar.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav>
      <h1 className='text-2xl'>RepoHunter</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
          <Link to="/favourites">Favourites</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
