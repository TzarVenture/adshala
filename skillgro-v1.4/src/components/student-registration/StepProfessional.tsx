'use client';
import { useFormContext, useWatch } from 'react-hook-form';

export default function StepProfessional() {
  const { register, control, formState: { errors } } = useFormContext();
  
  const status = useWatch({
    control,
    name: 'professionalStatus',
  });
  const showConditionalFields = ['Working Professional', 'Business Owner', 'Freelancer'].includes(status);

  return (
    <div className="form-step">
      <h2 className="step-title">Professional Details</h2>
      <p className="step-subtitle">Tell us about your current professional status.</p>

      <div className="form-field mb-4">
        <label>Current Status *</label>
        <div className="radio-group-grid mt-2">
          {['Student', 'Working Professional', 'Freelancer', 'Business Owner', 'Homemaker', 'Other'].map((option) => (
            <label key={option} className="custom-radio">
              <input
                type="radio"
                value={option}
                {...register('professionalStatus', { required: 'Please select your status' })}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        {errors.professionalStatus && <span className="form-error">{errors.professionalStatus.message as string}</span>}
      </div>

      {showConditionalFields && (
        <div className="form-grid mt-4">
          <div className="form-field">
            <label>Company / Business Name *</label>
            <input
              type="text"
              placeholder="e.g. Google, Self-employed"
              {...register('company', { required: 'Company name is required' })}
            />
            {errors.company && <span className="form-error">{errors.company.message as string}</span>}
          </div>

          <div className="form-field">
            <label>Current Designation *</label>
            <input
              type="text"
              placeholder="e.g. Marketing Manager"
              {...register('designation', { required: 'Designation is required' })}
            />
            {errors.designation && <span className="form-error">{errors.designation.message as string}</span>}
          </div>

          <div className="form-field">
            <label>Experience (Years) *</label>
            <input
              type="number"
              placeholder="e.g. 2"
              min="0"
              step="0.5"
              {...register('experience', { required: 'Experience is required' })}
            />
            {errors.experience && <span className="form-error">{errors.experience.message as string}</span>}
          </div>
        </div>
      )}
    </div>
  );
}
