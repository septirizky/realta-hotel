import React from 'react';
import './Footer.css'

export const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-left">
        <h3>Contact Us</h3>
        <p>Phone: +62822-6976-4383</p>
        <p>Address: Jawa Barat, Indonesia · 
            Jakarta Selatan, Jakarta, Indonesia · Bekasi, Jawa Barat, Indonesia</p>
      </div>

      <div className="footer-center">
        <div className="quick-links">
            <h3>Quick Links</h3>
        </div>
        <div className="links-list">
            <div className="left-links">
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#booking">Booking</a></li>
                <li><a href="#aboutUs">About Us</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#services">Services</a></li>
            </ul>
            </div>
            <div className="right-links">
            <ul>
                <li><a href="#ourRooms">Our Rooms</a></li>
                <li><a href="#restaurant">Restaurant</a></li>
                <li><a href="#payments">Payments</a></li>
                <li><a href="#events">Events</a></li>
            </ul>
            </div>
        </div>
        </div>

      <div className="footer-right">
        <h3>Subscribe Our Newsletter</h3>
        <div className="subscribe-box">
          <input type="text" placeholder="Your Email Address" />
          <button>Subscribe</button>
        </div>
      </div>
    </footer>
  );
};


