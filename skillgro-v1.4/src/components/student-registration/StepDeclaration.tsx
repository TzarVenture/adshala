'use client';
import { useFormContext } from 'react-hook-form';

export default function StepDeclaration() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="form-step">
      <h2 className="step-title">Emergency Contact & Declaration</h2>
      <p className="step-subtitle">Please provide an emergency contact and accept the terms.</p>

      <div className="form-grid mb-3">
        <div className="form-field">
          <label>Emergency Contact Name *</label>
          <input
            type="text"
            placeholder="Name of contact person"
            {...register('emergencyName', { required: 'Emergency contact name is required' })}
          />
          {errors.emergencyName && <span className="form-error">{errors.emergencyName.message as string}</span>}
        </div>

        <div className="form-field">
          <label>Relationship *</label>
          <input
            type="text"
            placeholder="e.g. Father, Mother, Spouse"
            {...register('emergencyRelation', { required: 'Relationship is required' })}
          />
          {errors.emergencyRelation && <span className="form-error">{errors.emergencyRelation.message as string}</span>}
        </div>

        <div className="form-field" style={{ gridColumn: '1 / -1' }}>
          <label>Emergency Mobile Number *</label>
          <input
            type="tel"
            placeholder="10-digit mobile number"
            maxLength={10}
            {...register('emergencyPhone', { 
              required: 'Emergency mobile number is required',
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: 'Invalid 10-digit mobile number'
              }
            })}
          />
          {errors.emergencyPhone && <span className="form-error">{errors.emergencyPhone.message as string}</span>}
        </div>
      </div>

      <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#161439', marginTop: '14px', marginBottom: '6px' }}>
        Terms & Declaration *
      </div>
      <div className="checkbox-wrapper" style={{ padding: '10px 12px' }}>
        <input
          type="checkbox"
          id="declaration"
          {...register('declaration', { required: 'You must agree to the terms and conditions' })}
          style={{ width: '16px', height: '16px', marginTop: '2px' }}
        />
        <label htmlFor="declaration" style={{ fontSize: '12.5px', color: '#444', lineHeight: 1.4 }}>
          I hereby declare that all information provided above is true to the best of my knowledge. I understand that any false information may lead to cancellation of admission.
        </label>
      </div>
      {errors.declaration && <span className="form-error d-block mt-1">{errors.declaration.message as string}</span>}
    </div>
  );
}
