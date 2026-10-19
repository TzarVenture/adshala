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

      {/* ── Section 1: Source Discovery ── */}
      <div
        className="form-section-card mb-3"
        style={{
          background: '#f8faf9',
          border: '1px solid #dbe6e0',
          borderRadius: '10px',
          padding: '12px 14px',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#161439',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <i className="fas fa-bullhorn" style={{ color: '#1a3f32', fontSize: '14px' }}></i>
          <span>How did you hear about us? *</span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            gap: '8px',
          }}
        >
          {SOURCES.map((source) => (
            <label
              key={source}
              className="source-option-pill"
            >
              <input
                type="radio"
                value={source}
                {...register('source', { required: 'Please select an option' })}
                style={{
                  width: '15px',
                  height: '15px',
                  accentColor: '#1a3f32',
                  flexShrink: 0,
                  cursor: 'pointer',
                }}
              />
              <span>{source}</span>
            </label>
          ))}
        </div>
        {errors.source && <span className="form-error mt-1 d-block">{errors.source.message as string}</span>}
      </div>

      {/* ── Section 2: Career Goals ── */}
      <div
        className="form-section-card mb-2"
        style={{
          background: '#f2f7f4',
          border: '1px solid #d5e5db',
          borderRadius: '10px',
          padding: '12px 14px',
        }}
      >
        <div
          style={{
            fontSize: '13.5px',
            fontWeight: 700,
            color: '#161439',
            marginBottom: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <i className="fas fa-bullseye" style={{ color: '#1a3f32', fontSize: '14px' }}></i>
          <span>Why do you want to join this course? (Career Goals) *</span>
        </div>
        <textarea
          style={{
            width: '100%',
            minHeight: '70px',
            padding: '8px 12px',
            fontSize: '13.5px',
            lineHeight: '1.4',
            borderRadius: '6px',
            border: '1px solid #cadcd1',
            background: '#ffffff',
          }}
          placeholder="Briefly describe your career goals..."
          {...register('goals', { required: 'Please describe your career goals' })}
        />
        {errors.goals && <span className="form-error mt-1 d-block">{errors.goals.message as string}</span>}
      </div>
    </div>
  );
}
