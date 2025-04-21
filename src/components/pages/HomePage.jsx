import React from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";
import astrologerData from "../Data/astrologerData"; // Dynamic data import

const HomePage = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <div className="astro-image-container">
            <img src={astrologerData.imageUrl} alt="Astrologer" className="astro-image" />
          </div>
          <div className="astro-description">
            <h1>{astrologerData.name}</h1>
            <p className="tagline">{astrologerData.experience} of Vedic Astrology Experience</p>
            <p className="bio">{astrologerData.bio}</p>
            <Link to="/booking" className="book-btn">Book a Consultation</Link>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="section">
        <h2>✨ About Me</h2>
        <p>{astrologerData.about}</p>
      </section>

      {/* Services Section */}
      <section className="section services">
        <h2>🔮 Services Offered</h2>
        <div className="services-grid">
          {astrologerData.services.map((service, index) => (
            <div key={index} className="service-card">
              <img src={service.icon} alt={service.name} className="service-icon" />
              <h3>{service.name}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section testimonials">
        <h2>🌟 What Clients Say</h2>
        <div className="testimonial-grid">
          {astrologerData.testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-rating">
                {Array(testimonial.rating)
                  .fill("⭐")
                  .map((star, i) => (
                    <span key={i}>{star}</span>
                  ))}
              </div>
              <p className="testimonial-quote">"{testimonial.quote}"</p>
              <p className="testimonial-client">- {testimonial.client}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready for a Consultation?</h2>
        <Link to="/booking" className="book-btn">Book Now</Link>
      </section>
    </div>
  );
};

export default HomePage;
