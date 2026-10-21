'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import "./EnquiryForm.css";
import BtnArrow from "@/svg/BtnArrow"
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
  'Certification in Advanced Digital Marketing & AI',
  'Certification in Advanced Graphic Design & AI',
  'Mastery in Social Media Management',
  'Marketplace Certification',
  'SEO Certification',
  'Certification in Web Development '
];

export default function EnquiryForm() {

  return (
    <div className='form-parent'>
      <div className='form-left-col'>
        <EnquiryFormContainer />
      </div>
      <div className='form-img'>
        <Image
          src="/enquiry-section-art.png"
          alt="Adshalaa Career Guidance & Enquiry"
          width={650}
          height={433}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 650px"
        />
      </div>
    </div>
  );
}

export function EnquiryFormContainer({ defaultProgram }: { defaultProgram?: string }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ 
    mode: "onChange",
    defaultValues: {
      program: defaultProgram || ""
    }
  });
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<{
    loading: boolean;
    success: boolean | null;
    message: string;
  }>({
    loading: false,
    success: null,
    message: '',
  });

  const onSubmit = async (data: FormData) => {
    setStatus({ loading: true, success: null, message: '' });

    try {
      const response = await fetch('/api/enquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({
          loading: false,
          success: true,
          message: 'Your enquiry has been submitted successfully!',
        });
        reset();
      } else {
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
    <div className="form-container" id='enquiry-form01'>
      <h2 className="form-title">Enquiry Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="enquiry-form">

        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            placeholder="Enter Your Name"
            {...register('name', {
              required: 'Name is required',
              validate: (value) => {
                if (!value) return undefined;
                if (value.trim().length < 2) return 'Name must be at least 2 characters';
                if (!/^[a-zA-Z\s]+$/.test(value)) return 'Name should contain only alphabets';
                return undefined;
              }
            })}
          />
          {errors.name && <p className="text-danger mt-1 mb-0" style={{ fontSize: "12px" }}>{errors.name.message}</p>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="text"
              id="phone"
              placeholder="Enter Your Phone No."
              inputMode="numeric"
              maxLength={10}
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
              }}
              {...register("phone", {
                required: "Phone number is required",
                validate: (value) => {
                  if (!value) {
                    return "Phone number is required";
                  }

                  if (!/^\d+$/.test(value)) {
                    return "Phone number must contain only digits";
                  }

                  if (value.length < 10) {
                    return "Phone number must be 10 digits";
                  }

                  if (value.length > 10) {
                    return "Phone number cannot exceed 10 digits";
                  }

                  if (!/^[6-9]/.test(value)) {
                    return "Phone number must start with 6, 7, 8, or 9";
                  }

                  return true;
                },
              })}
            />
            {errors.phone && <p className="text-danger mt-1 mb-0" style={{ fontSize: "12px" }}>{errors.phone.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email"
              {...register('email', {
                required: 'Email is required',
                validate: (value) => {
                  if (!value) return undefined;
                  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) return 'Invalid email address';
                  return undefined;
                }
              })}
            />
            {errors.email && <p className="text-danger mt-1 mb-0" style={{ fontSize: "12px" }}>{errors.email.message}</p>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city">City *</label>
            <input
              type="text"
              id="city"
              placeholder="Enter City"
              {...register('city', { required: 'City is required' })}
            />
            {errors.city && <p className="text-danger mt-1 mb-0" style={{ fontSize: "12px" }}>{errors.city.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="program">Interested Program *</label>
            <select
              id="program"
              style={{ padding: "9.1px" }}
              {...register('program', { required: 'Please select a program' })}
            >
              <option value="" disabled>Select a program</option>
              {PROGRAMS.map((prog) => (
                <option key={prog} value={prog}>{prog}</option>
              ))}
            </select>
            {errors.program && <p className="text-danger mt-1 mb-0" style={{ fontSize: "12px" }}>{errors.program.message}</p>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            rows={2}
            placeholder="Tell us more about your requirements..."
            {...register('message', { required: 'Message is required' })}
          />
          {errors.message && <p className="text-danger mt-1 mb-0" style={{ fontSize: "12px" }}>{errors.message.message}</p>}
        </div>
        <div className="consent-group">
          <label className="consent-label">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              required
            />
            <span>
              By Proceeding, I agree to <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">T&C</a> and <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>. Yes, I would like to receive updates via SMS & WhatsApp.
            </span>
          </label>
        </div>
        {/* <button type="submit" disabled={status.loading || !agreed} className="submit-btn">
          {status.loading ? 'Submitting...' : 'Submit Enquiry'}
        </button> */}
        <button
          type="submit"
          className="btn btn-two arrow-btn "
          style={{ width: "100%" }}
          disabled={status.loading || !agreed}
        >
          <span style={{ width: "100%" }}>

            {status.loading ? 'Submitting...' : 'Submit Enquiry'}
          </span>
        </button>
        {status.message && (
          <div className={`status-banner ${status.success ? 'success' : 'error'}`}>
            {status.message}
          </div>
        )}
      </form>
    </div>
  )
}