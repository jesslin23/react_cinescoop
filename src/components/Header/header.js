import React, { useState } from 'react';
import { Link } from 'react-scroll';
import './header.css';
import ContactForm from '../ContactForm/ContactForm'; 

const Header = () => {
  const [isContactOpen, setIsContactOpen] = useState(false); 
  const [menuOpen, setMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className='header'>
      <div className='header_left'>
        <h1>K-<span>Flix𓂃🖊</span></h1>
      </div>

      <div className='hamburger' onClick={() => setMenuOpen(!menuOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className={`header_right ${menuOpen ? 'open' : ''}`}>
        <Link to='home' smooth duration={500} onClick={handleLinkClick}>
          <h4>Home</h4>
        </Link>
        <Link to='now_playing' smooth duration={500} onClick={handleLinkClick}>
          <h4>Now streaming</h4>
        </Link>
        <Link to='editorials' smooth duration={500} onClick={handleLinkClick}>
          <h4>Interviews</h4>
        </Link>
        <Link to='Blog' smooth duration={500} onClick={handleLinkClick}>
          <h4>Blog</h4>
        </Link>

        {/* Username badge */}
        {user && (
          <div style={{
            backgroundColor: "#BDA78D",
            color: "black",
            padding: "5px 10px",
            borderRadius: "10px",
            fontSize: "14px"
          }}>
            {user.username}
          </div>
        )}

        <button
          className="contact-button"
          onClick={() => {
            setIsContactOpen(true);
            setMenuOpen(false);
          }}
        >
          <h4>접촉✉︎</h4>
        </button>

        {/* Logout */}
        {user && (
          <button className="contact-button" onClick={handleLogout}>
            <h4>Logout</h4>
          </button>
        )}
      </div>

      {isContactOpen && (
        <ContactForm isOpen={isContactOpen} setIsOpen={setIsContactOpen} />
      )}
    </div>
  );
};

export default Header;