'use client';
import { useFormContext } from 'react-hook-form';

export default function StepDeclaration() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="form-step">
      <h2 className="step-title">Emergency Contact & Declaration</h2>
      <p className="step-subtitle">Please provide an emergency contact and accept the terms.</p>

      <div className="form-grid mb-4">
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

      <div className="mt-4 pt-4" style={{ borderTop: '1px solid #e7e7e7' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', color: '#161439' }}>
          Document Checklist Acknowledgment
        </h3>
        <p style={{ fontSize: '14px', color: '#6D6C80', marginBottom: '16px' }}>
          I acknowledge that I will submit copies of the following documents during physical verification:
          Aadhaar Card, PAN Card, 2 Passport Photos, 10th/12th/Graduation Marksheets, and Resume.
        </p>
        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            id="docAck"
            {...register('docAck', { required: 'You must acknowledge the document checklist' })}
          />
          <label htmlFor="docAck">
            I confirm that I have the required documents and will submit them.
          </label>
        </div>
        {errors.docAck && <span className="form-error d-block mt-1">{errors.docAck.message as string}</span>}
      </div>

      <div className="mt-4">
        <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', color: '#161439' }}>
          Declaration
        </h3>
        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            id="declaration"
            {...register('declaration', { required: 'You must agree to the declaration' })}
          />
          <label htmlFor="declaration">
            I hereby declare that all the information provided in this registration form is true and correct to the best of my knowledge. I agree to abide by the rules, regulations, and policies of <strong>ADSHALAA – Digital Marketing Institute, Mumbai</strong>.
          </label>
        </div>
        {errors.declaration && <span className="form-error d-block mt-1">{errors.declaration.message as string}</span>}
      </div>
    </div>
  );
}
