import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './ContactForm.css';

const ContactForm = ({ isOpen, setIsOpen }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_ht85xr9', 'template_gtqh79o', e.target, 'zQqTDNRPhzvWvo0PF')
      .then((result) => {
        console.log(result.text);
        alert('Message Sent!');
        setIsOpen(false); // Close popup after sending
      }, (error) => {
        console.log(error.text);
        alert('Message failed to send!');
      });

    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className={`contact-popup ${isOpen ? 'open' : ''}`}>
      <div className="contact-popup-inner">
        <h2>Stay in touch!</h2>
        <form onSubmit={sendEmail}>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Message</label>
          <textarea name="message" value={formData.message} onChange={handleChange} required></textarea>

          <button type="submit">Send</button>
          <button type="button" onClick={() => setIsOpen(false)}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
