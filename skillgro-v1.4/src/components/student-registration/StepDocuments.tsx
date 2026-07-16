'use client';
import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

export default function StepDocuments() {
  const { register, setValue, formState: { errors } } = useFormContext();

  const [mode, setMode] = useState<'online' | 'offline' | ''>('');
  const [idType, setIdType] = useState('');

  // Sync local state → react-hook-form
  useEffect(() => { setValue('documentMode', mode); }, [mode, setValue]);
  useEffect(() => { setValue('secondaryIdType', idType); }, [idType, setValue]);

  return (
    <div className="form-step">
      <h2 className="step-title">Document Submission</h2>
      <p className="step-subtitle">
        Choose how you wish to submit your KYC documents. Aadhaar is mandatory.
      </p>

      {/* Validation field */}
      <input type="hidden" {...register('documentMode', { required: 'Please select a submission method' })} />

      {/* Cards */}
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
      {errors.documentMode && <span className="form-error d-block mb-3">{errors.documentMode.message as string}</span>}

      {/* ── ONLINE ────────────────────────────────────────────────── */}
      {mode === 'online' && (
        <div key="online-section">
          <div className="doc-upload-card">
            <div className="doc-upload-header">
              <div className="doc-upload-label">
                <i className="fas fa-id-card"></i>
                <div>
                  <span className="doc-upload-name">Aadhaar Card</span>
                  <span className="doc-upload-required">Mandatory</span>
                </div>
              </div>
              <span className="doc-upload-hint">PDF / JPG / PNG · Max 5MB</span>
            </div>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="doc-file-input mt-2"
              {...register('aadhaarFile', { required: mode === 'online' ? 'Aadhaar is mandatory' : false })}
            />
            {errors.aadhaarFile && <span className="form-error mt-1 d-block">{errors.aadhaarFile.message as string}</span>}
          </div>

          <div className="doc-upload-card mt-3">
            <div className="doc-upload-header">
              <div className="doc-upload-label">
                <i className="fas fa-address-card"></i>
                <div>
                  <span className="doc-upload-name">Secondary ID</span>
                  <span className="doc-upload-secondary">Any one required</span>
                </div>
              </div>
              <span className="doc-upload-hint">PDF / JPG / PNG · Max 5MB</span>
            </div>

            <input type="hidden" {...register('secondaryIdType', { required: mode === 'online' ? 'Select an ID type' : false })} />
            <div className="secondary-id-selector mt-3">
              {['PAN Card', 'Voter ID', 'Passport'].map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`secondary-id-pill ${idType === t ? 'secondary-id-pill--active' : ''}`}
                  onClick={() => setIdType(t)}
                >
                  {t}
                </button>
              ))}
            </div>
            {errors.secondaryIdType && <span className="form-error mt-1 d-block">{errors.secondaryIdType.message as string}</span>}

            {idType && (
              <div className="mt-3">
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#1a3f32', display: 'block', marginBottom: '6px' }}>
                  Upload {idType} *
                </label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="doc-file-input"
                  {...register('secondaryFile', { required: mode === 'online' && idType ? `Upload your ${idType}` : false })}
                />
                {errors.secondaryFile && <span className="form-error mt-1 d-block">{errors.secondaryFile.message as string}</span>}
              </div>
            )}
          </div>

          <p className="mt-3" style={{ fontSize: '12px', color: '#6D6C80' }}>
            <i className="fas fa-info-circle me-1"></i>
            Documents are encrypted and used only for admission verification.
          </p>
        </div>
      )}

      {/* ── OFFLINE ───────────────────────────────────────────────── */}
      {mode === 'offline' && (
        <div key="offline-section">
          <div className="offline-ack-header">
            <i className="fas fa-clipboard-list" style={{ fontSize: '26px', color: '#f57f17', flexShrink: 0, marginTop: '2px' }}></i>
            <div>
              <h3>Documents to Bring</h3>
              <p>Carry originals + 1 photocopy each before your batch starts.</p>
            </div>
          </div>
          <ul className="offline-doc-list">
            <li><i className="fas fa-check-circle"></i><div><strong>Aadhaar Card</strong><span>Mandatory</span></div></li>
            <li><i className="fas fa-check-circle"></i><div><strong>Secondary ID</strong><span>PAN / Voter ID / Passport</span></div></li>
            <li><i className="fas fa-check-circle"></i><div><strong>Educational Marksheets</strong><span>Highest qualification</span></div></li>
            <li><i className="fas fa-check-circle"></i><div><strong>Passport Photos</strong><span>2 recent</span></div></li>
          </ul>
          <div className="checkbox-wrapper" style={{ background: '#fff8e1', border: '1px solid #ffe082' }}>
            <input
              type="checkbox"
              id="offlineAck"
              {...register('offlineAck', { required: mode === 'offline' ? 'You must acknowledge' : false })}
            />
            <label htmlFor="offlineAck" style={{ color: '#333' }}>
              I agree to physically submit documents at Adshaala center <strong>before batch commencement</strong>.
            </label>
          </div>
          {errors.offlineAck && <span className="form-error d-block mt-1">{errors.offlineAck.message as string}</span>}
        </div>
      )}
    </div>
  );
}
