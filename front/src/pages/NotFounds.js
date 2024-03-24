import monimage from '../erreur.png';
import React from 'react';
import '../styles/NotFounds.css';
import {Link} from 'react-router-dom';

const NotFounds = () => {
  return (
    <div className='notfound'>
      <div className='notfound2'>
          <h2 className='notfound-text'> Social Media App </h2>
          <p className='notfound-found'>The request URL was not found. Go to home page 
          <Link to={'/'}> Here </Link>
          </p>
        </div>
        <img className='image-erreur' src={monimage} alt='erreur' />
    </div>
  )
}

export default NotFounds
