'use client';
import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

export default function StepDocuments() {
  const { register, setValue, formState: { errors } } = useFormContext();

  const [mode, setMode] = useState<'online' | 'offline' | ''>('offline');
  const [idType, setIdType] = useState('');

  // Sync local state → react-hook-form
  useEffect(() => { setValue('documentMode', mode); }, [mode, setValue]);
  useEffect(() => { setValue('secondaryIdType', idType); }, [idType, setValue]);

  return (
    <div className="form-step">
      <h2 className="step-title">Document Submission</h2>
      <p className="step-subtitle">
        All documents must be physically verified at our center. Please select the offline submission option below.
      </p>

      {/* Validation field */}
      <input type="hidden" {...register('documentMode', { required: 'Please select a submission method' })} />

      {/* Commented out selector cards for future use:
      <div className="doc-mode-selector mb-2">
        <div
          className={`doc-mode-card ${mode === 'online' ? 'doc-mode-card--active' : ''}`}
          onClick={() => setMode('online')}
        >
          <div className="doc-mode-icon"><i className="fas fa-cloud-upload-alt"></i></div>
          <div style={{ flex: 1 }}>
            <span className="doc-mode-title">Upload Online</span>
            <span className="doc-mode-desc">Upload documents now (Recommended)</span>
          </div>
          {mode === 'online' && <i className="fas fa-check-circle" style={{ color: '#1a3f32', fontSize: '18px' }}></i>}
        </div>

        <div
          className={`doc-mode-card ${mode === 'offline' ? 'doc-mode-card--active' : ''}`}
          onClick={() => setMode('offline')}
        >
          <div className="doc-mode-icon"><i className="fas fa-building"></i></div>
          <div style={{ flex: 1 }}>
            <span className="doc-mode-title">Submit at Center</span>
            <span className="doc-mode-desc">Bring originals to the institute</span>
          </div>
          {mode === 'offline' && <i className="fas fa-check-circle" style={{ color: '#1a3f32', fontSize: '18px' }}></i>}
        </div>
      </div>
      */}

      {/* Active Submission Method Banner */}
      <div className="doc-mode-info-card mb-3" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 14px',
        background: '#edf4f0',
        border: '1px solid #1a3f32',
        borderRadius: '8px'
      }}>
        <div style={{
          background: '#1a3f32',
          color: '#ffc224',
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          flexShrink: 0
        }}>
          <i className="fas fa-building"></i>
        </div>
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#161439', display: 'block' }}>
            Submit at Center (In-Person Verification)
          </span>
          <span style={{ fontSize: '12px', color: '#555', display: 'block', marginTop: '2px' }}>
            Verify records in-person at center or send scans to <strong>info@adshalaa.com</strong>
          </span>
        </div>
      </div>
      {errors.documentMode && <span className="form-error d-block mb-2">{errors.documentMode.message as string}</span>}

      {/* ── OFFLINE ───────────────────────────────────────────────── */}
      {mode === 'offline' && (
        <div key="offline-section">
          <div style={{ marginBottom: '8px', fontSize: '13px', color: '#444' }}>
            <strong>Required Verification Checklist:</strong>
          </div>
          <div className="doc-checklist-grid">
            <div className="doc-checklist-item">
              <i className="fas fa-check-circle" style={{ color: '#1a3f32', fontSize: '14px' }}></i>
              <div>
                <strong>Aadhaar Card</strong>
                <span style={{ fontSize: '11px', color: '#666', display: 'block' }}>Mandatory ID</span>
              </div>
            </div>
            <div className="doc-checklist-item">
              <i className="fas fa-check-circle" style={{ color: '#1a3f32', fontSize: '14px' }}></i>
              <div>
                <strong>Secondary ID</strong>
                <span style={{ fontSize: '11px', color: '#666', display: 'block' }}>PAN / Voter / Passport</span>
              </div>
            </div>
            <div className="doc-checklist-item">
              <i className="fas fa-check-circle" style={{ color: '#1a3f32', fontSize: '14px' }}></i>
              <div>
                <strong>Academic Records</strong>
                <span style={{ fontSize: '11px', color: '#666', display: 'block' }}>Highest qualification</span>
              </div>
            </div>
            <div className="doc-checklist-item">
              <i className="fas fa-check-circle" style={{ color: '#1a3f32', fontSize: '14px' }}></i>
              <div>
                <strong>Passport Photos</strong>
                <span style={{ fontSize: '11px', color: '#666', display: 'block' }}>2 recent copies</span>
              </div>
            </div>
          </div>

          <div className="checkbox-wrapper mt-3" style={{ background: '#fff8e1', border: '1px solid #ffe082', padding: '10px 12px' }}>
            <input
              type="checkbox"
              id="offlineAck"
              {...register('offlineAck', { required: mode === 'offline' ? 'You must acknowledge' : false })}
              style={{ width: '16px', height: '16px', marginTop: '2px' }}
            />
            <label htmlFor="offlineAck" style={{ fontSize: '12.5px', color: '#333', lineHeight: 1.4 }}>
              I agree to submit verification documents physically or via email to <strong>info@adshalaa.com</strong> before batch starts.
            </label>
          </div>
          {errors.offlineAck && <span className="form-error d-block mt-1">{errors.offlineAck.message as string}</span>}
        </div>
      )}
    </div>
  );
}
