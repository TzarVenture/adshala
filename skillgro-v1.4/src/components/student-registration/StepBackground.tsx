'use client';
import { useFormContext } from 'react-hook-form';

const SOURCES = [
  'Google Search',
  'Instagram',
  'Facebook',
  'YouTube',
  'LinkedIn',
  'WhatsApp',
  'Friend/Relative',
  'College Seminar',
  'Justdial',
  'Walk-in',
  'Other'
];

export default function StepBackground() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="form-step">
      <h2 className="step-title">Background & Goals</h2>
      <p className="step-subtitle">Help us understand how you found us and what you aim to achieve.</p>

      <div className="form-field mb-4">
        <label>How did you hear about us? *</label>
        <div className="radio-group-grid mt-2">
          {SOURCES.map((source) => (
            <label key={source} className="custom-radio">
              <input
                type="radio"
                value={source}
                {...register('source', { required: 'Please select an option' })}
              />
              <span>{source}</span>
            </label>
          ))}
        </div>
        {errors.source && <span className="form-error">{errors.source.message as string}</span>}
      </div>

      <div className="form-field mt-4">
        <label>Why do you want to join this course? (Career Goals) *</label>
        <textarea
          placeholder="Briefly describe your career goals and what you expect from this course..."
          {...register('goals', { required: 'Please describe your career goals' })}
        />
        {errors.goals && <span className="form-error">{errors.goals.message as string}</span>}
      </div>
    </div>
  );
}
