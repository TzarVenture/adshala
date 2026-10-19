'use client';
import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

export default function StepPersonal() {
  const { register, watch, setValue, clearErrors, setError, formState: { errors } } = useFormContext();

  const emailValue = watch('email');
  const isEmailVerified = watch('isEmailVerified');

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [otpSuccess, setOtpSuccess] = useState('');
  const [countdown, setCountdown] = useState(0);

  // Countdown timer for Resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendOtp = async () => {
    setOtpError('');
    setOtpSuccess('');

    if (!emailValue || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue.trim())) {
      setError('email', { type: 'manual', message: 'Please enter a valid email address first.' });
      return;
    }

    setIsSendingOtp(true);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailValue }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOtpSent(true);
        setOtpSuccess('Verification code sent to your email.');
        setCountdown(60);
      } else {
        setOtpError(data.error || 'Failed to send verification code.');
      }
    } catch (err) {
      setOtpError('Network error. Failed to send verification code.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    setOtpError('');
    setOtpSuccess('');

    if (!otp || otp.trim().length !== 6) {
      setOtpError('Please enter the 6-digit verification code.');
      return;
    }

    setIsVerifyingOtp(true);
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailValue, otp: otp.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setValue('isEmailVerified', true, { shouldValidate: true });
        clearErrors('email');
        setOtpSuccess('Email verified successfully!');
        setOtp('');
      } else {
        setOtpError(data.error || 'Invalid or expired code.');
      }
    } catch (err) {
      setOtpError('Network error. Failed to verify code.');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleChangeEmail = () => {
    setValue('isEmailVerified', false);
    setOtpSent(false);
    setOtp('');
    setOtpError('');
    setOtpSuccess('');
  };

  return (
    <div className="form-step">
      <h2 className="step-title">Personal Details</h2>
      <p className="step-subtitle">Please provide your basic information to get started.</p>

      {/* Hidden field for react-hook-form validation */}
      <input type="hidden" {...register('isEmailVerified')} />

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

        {/* Email with OTP Verification */}
        <div className="form-field">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <label style={{ margin: 0 }}>Email Address *</label>
            {isEmailVerified && (
              <span style={{ fontSize: '12px', color: '#2e7d32', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <i className="fas fa-check-circle"></i> Verified
                <button
                  type="button"
                  onClick={handleChangeEmail}
                  style={{ background: 'none', border: 'none', color: '#1a3f32', textDecoration: 'underline', cursor: 'pointer', fontSize: '11px', marginLeft: '6px' }}
                >
                  Change
                </button>
              </span>
            )}
          </div>

          <div style={{ position: 'relative', display: 'flex', gap: '8px' }}>
            <input
              type="email"
              placeholder="john@example.com"
              disabled={isEmailVerified}
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Invalid email address'
                },
                onChange: () => {
                  if (isEmailVerified) setValue('isEmailVerified', false);
                  if (otpSent) setOtpSent(false);
                }
              })}
              style={{
                flex: 1,
                backgroundColor: isEmailVerified ? '#f8faf9' : '#fff',
                borderColor: isEmailVerified ? '#bbf7d0' : undefined
              }}
            />
            {!isEmailVerified && (
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={isSendingOtp || countdown > 0}
                style={{
                  padding: '0 16px',
                  background: '#1a3f32',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  cursor: isSendingOtp || countdown > 0 ? 'not-allowed' : 'pointer',
                  opacity: isSendingOtp || countdown > 0 ? 0.7 : 1,
                  fontFamily: 'inherit'
                }}
              >
                {isSendingOtp ? 'Sending...' : countdown > 0 ? `Resend (${countdown}s)` : otpSent ? 'Resend OTP' : 'Verify Email'}
              </button>
            )}
          </div>
          {errors.email && <span className="form-error">{errors.email.message as string}</span>}

          {/* OTP Input Drawer */}
          {otpSent && !isEmailVerified && (
            <div
              style={{
                marginTop: '10px',
                padding: '12px 14px',
                background: '#f8faf9',
                border: '1px solid #d2e4db',
                borderRadius: '8px',
              }}
            >
              <div style={{ fontSize: '12px', color: '#555', marginBottom: '8px' }}>
                We sent a 6-digit verification code to <strong>{emailValue}</strong>:
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  style={{
                    flex: 1,
                    maxWidth: '160px',
                    padding: '8px 12px',
                    fontSize: '15px',
                    fontFamily: 'monospace',
                    letterSpacing: '3px',
                    textAlign: 'center',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    background: '#fff'
                  }}
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={isVerifyingOtp || otp.length !== 6}
                  style={{
                    padding: '8px 16px',
                    background: '#1a3f32',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: isVerifyingOtp || otp.length !== 6 ? 'not-allowed' : 'pointer',
                    opacity: isVerifyingOtp || otp.length !== 6 ? 0.6 : 1
                  }}
                >
                  {isVerifyingOtp ? 'Verifying...' : 'Confirm ✓'}
                </button>
              </div>

              {otpError && (
                <div style={{ fontSize: '12px', color: '#dc2626', marginTop: '6px' }}>
                  {otpError}
                </div>
              )}
              {otpSuccess && (
                <div style={{ fontSize: '12px', color: '#16a34a', marginTop: '6px' }}>
                  {otpSuccess}
                </div>
              )}
            </div>
          )}
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
