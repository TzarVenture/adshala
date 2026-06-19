'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import "./EnquiryForm.css";

// Define the shape of our form state
interface FormData {
  name: string;
  phone: string;
  email: string;
  city: string;
  program: string;
  message: string;
}

// Available program list options
const PROGRAMS = [
  'Web Development',
  'UI/UX Designing',
  'Data Science',
  'Digital Marketing',
  'Cyber Security'
];

export default function EnquiryForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    city: '',
    program: '',
    message: '',
  });

  const [status, setStatus] = useState<{
    loading: boolean;
    success: boolean | null;
    message: string;
  }>({
    loading: false,
    success: null,
    message: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, message: '' });

    try {
      const response = await fetch('/api/enquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({
          loading: false,
          success: true,
          message: 'Your enquiry has been submitted successfully!',
        });
        // Reset form on success
        setFormData({ name: '', phone: '', email: '', city: '', program: '', message: '' });
      } else {
        // If the server returned a 207 (Partial Success) or an error status
        setStatus({
          loading: false,
          success: false,
          message: result.error || 'Something went wrong during submission.',
        });
      }
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        message: 'Network error. Please try again later.',
      });
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Enquiry Form</h2>
      <form onSubmit={handleSubmit} className="enquiry-form">
        
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="1234567890"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city">City *</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              placeholder="Mumbai"
            />
          </div>

          <div className="form-group">
            <label htmlFor="program">Interested Program *</label>
            <select
              id="program"
              name="program"
              value={formData.program}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select a program</option>
              {PROGRAMS.map((prog) => (
                <option key={prog} value={prog}>{prog}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Tell us more about your requirements..."
          />
        </div>

        <button type="submit" disabled={status.loading} className="submit-btn">
          {status.loading ? 'Submitting...' : 'Submit Enquiry'}
        </button>

        {status.message && (
          <div className={`status-banner ${status.success ? 'success' : 'error'}`}>
            {status.message}
          </div>
        )}
      </form>
    </div>
  );
}