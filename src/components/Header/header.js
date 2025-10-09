import React, { useState } from 'react';
import { Link } from 'react-scroll';
import './header.css';
import ContactForm from '../ContactForm/ContactForm'; 

const Header = () => {
  const [isContactOpen, setIsContactOpen] = useState(false); 

  return (
    <div className='header'>
      <div className='header_left'>
        <h1>K-<span>Flix𓂃🖊</span></h1>
      </div>
      <div className='header_right'>
        <Link to='home' smooth={true} duration={500}>
          <h4>Home</h4>
        </Link>
        <Link to='now_playing' smooth={true} duration={500}>
          <h4>Now streaming</h4>
        </Link>
        <Link to='editorials' smooth={true} duration={500}>
          <h4>Interviews</h4>
        </Link>
        <Link to='Blog' smooth={true} duration={500}>
          <h4>Blog</h4>
        </Link>

     
        <button className="contact-button" onClick={() => setIsContactOpen(true)}>
          <h4>접촉✉︎</h4>
        </button>
      </div>

 
      {isContactOpen && (
        <ContactForm isOpen={isContactOpen} setIsOpen={setIsContactOpen} />
      )}
    </div>
  );
};

export default Header;
