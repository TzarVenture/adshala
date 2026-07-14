'use client';
import { useFormContext } from 'react-hook-form';

export default function StepPersonal() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="form-step">
      <h2 className="step-title">Personal Details</h2>
      <p className="step-subtitle">Please provide your basic information to get started.</p>

      <div className="form-grid">
        {/* Name */}
        <div className="form-field">
          <label>Full Name *</label>
          <input
            type="text"
            placeholder="John Doe"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <span className="form-error">{errors.name.message as string}</span>}
        </div>

        {/* Email */}
        <div className="form-field">
          <label>Email Address *</label>
          <input
            type="email"
            placeholder="john@example.com"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email address'
              }
            })}
          />
          {errors.email && <span className="form-error">{errors.email.message as string}</span>}
        </div>

        {/* Phone */}
        <div className="form-field">
          <label>Mobile Number *</label>
          <input
            type="tel"
            placeholder="9876543210"
            maxLength={10}
            {...register('phone', { 
              required: 'Phone number is required',
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: 'Invalid 10-digit mobile number'
              }
            })}
          />
          {errors.phone && <span className="form-error">{errors.phone.message as string}</span>}
        </div>

        {/* DOB */}
        <div className="form-field">
          <label>Date of Birth *</label>
          <input
            type="date"
            {...register('dob', { required: 'Date of Birth is required' })}
          />
          {errors.dob && <span className="form-error">{errors.dob.message as string}</span>}
        </div>

        {/* City / Address */}
        <div className="form-field" style={{ gridColumn: '1 / -1' }}>
          <label>City / Address *</label>
          <input
            type="text"
            placeholder="Mumbai, Maharashtra"
            {...register('city', { required: 'City / Address is required' })}
          />
          {errors.city && <span className="form-error">{errors.city.message as string}</span>}
        </div>
      </div>
    </div>
  );
}
