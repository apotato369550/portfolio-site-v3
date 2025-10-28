'use client';

import React, { useState } from 'react';
import './ContactSection.css';

// Casual comment: This contact form is gonna be super flashy and vaporwave-y
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('');

  // Handle input changes - keeping it simple
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validation function - gotta make sure fields aren't empty and email is legit
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  // Handle form submit - sending that POST request
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    setFeedback('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFeedback('Message sent successfully! Thanks for reaching out.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFeedback('Oops, something went wrong. Try again later.');
      }
    } catch (error) {
      setFeedback('Network error. Please check your connection.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="contact-section" className="h-screen w-screen m-0 p-0 relative overflow-hidden">
      <div className="contact-gradient-container h-full w-full m-0 p-0 relative">

        {/* Floating vaporwave elements - making it pop */}
        <div className="contact-floating-elements absolute inset-0 z-1">
          <div className="contact-ellipse contact-ellipse-1 absolute rounded-full transform rotate-30"></div>
          <div className="contact-ellipse contact-ellipse-2 absolute rounded-full transform -rotate-15"></div>
          <div className="contact-ellipse contact-ellipse-3 absolute rounded-full transform rotate-45"></div>

          <div className="contact-star contact-star-1 absolute w-4 h-4 bg-cyan-400 rounded-full blur-sm animate-pulse"></div>
          <div className="contact-star contact-star-2 absolute w-3 h-3 bg-cyan-300 rounded-full blur-sm animate-pulse"></div>
          <div className="contact-star contact-star-3 absolute w-5 h-5 bg-cyan-500 rounded-full blur-sm animate-pulse"></div>

          <svg className="contact-wireframe contact-wireframe-1 absolute w-24 h-24" viewBox="0 0 100 100">
            <polygon points="50,10 90,90 10,90" className="contact-wireframe-shape" />
          </svg>
          <svg className="contact-wireframe contact-wireframe-2 absolute w-20 h-20" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="35" className="contact-wireframe-shape" />
          </svg>
        </div>

        <div className="contact-container relative z-10 h-full w-full flex flex-col justify-center items-center px-4">

           {/* Title with vaporwave flair */}
           <div className="contact-title mb-6 sm:mb-8">
             <h1 className="font-light text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-10xl text-white leading-tight text-center">
               <span className="contact-emphasis font-light italic">Get In Touch</span>
             </h1>
           </div>

           {/* Contact Form - glass morphism style */}
           <div className="contact-form-container max-w-3xl w-full">
            <div className="glass-morphism p-6 sm:p-8 rounded-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white text-xl mb-2 font-light">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="contact-input w-full p-3 rounded-lg bg-transparent border-2 border-cyan-400 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-300 transition-colors"
                    placeholder="Your name"
                  />
                  {errors.name && <p className="text-red-400 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-white text-xl mb-2 font-light">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="contact-input w-full p-3 rounded-lg bg-transparent border-2 border-cyan-400 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-300 transition-colors"
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="text-red-400 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-white text-xl mb-2 font-light">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="contact-input w-full p-3 rounded-lg bg-transparent border-2 border-cyan-400 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-300 transition-colors resize-none"
                    placeholder="What's on your mind?"
                  />
                  {errors.message && <p className="text-red-400 mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="contact-submit-btn w-full py-3 px-6 bg-gradient-to-r from-cyan-400 to-cyan-500 text-white font-light rounded-lg hover:from-cyan-500 hover:to-cyan-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>

              {feedback && (
                <div className={`mt-6 p-4 rounded-lg ${feedback.includes('successfully') ? 'bg-green-500/20 border border-green-400' : 'bg-red-500/20 border border-red-400'}`}>
                  <p className="text-white">{feedback}</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactSection;