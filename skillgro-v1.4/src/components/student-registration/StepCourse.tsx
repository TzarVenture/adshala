'use client';
import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import course_data from '@/data/home-data/CourseData';

// Fetch the main courses from the first home variant
const COURSES = course_data[0].course_details.map(c => ({
  title: c.title,
  price: c.price
}));

const BATCH_SCHEDULES = [
  'Weekday Morning',
  'Weekday Evening',
  'Weekend'
];

const BATCH_MODES = [
  'Online',
  'Offline',
  'Hybrid'
];

export default function StepCourse() {
  const { register, control, setValue, getValues, formState: { errors } } = useFormContext();
  
  const selectedCourse = useWatch({ control, name: 'course' });
  const selectedSchedule = useWatch({ control, name: 'batchSchedule' });
  const selectedMode = useWatch({ control, name: 'batchMode' });

  // Update coursePrice whenever selectedCourse changes
  useEffect(() => {
    if (selectedCourse) {
      const price = COURSES.find(c => c.title === selectedCourse)?.price || 0;
      setValue('coursePrice', price);
    }
  }, [selectedCourse, setValue]);

  // Automatically construct and sync the composite batch value (e.g. "Weekend (Online)")
  useEffect(() => {
    if (selectedSchedule && selectedMode) {
      setValue('batch', `${selectedSchedule} (${selectedMode})`, { shouldValidate: true });
    } else {
      setValue('batch', '');
    }
  }, [selectedSchedule, selectedMode, setValue]);

  // Backward-compatibility: if batch was loaded from localStorage with existing format, parse it
  useEffect(() => {
    const savedBatch = getValues('batch');
    if (savedBatch && (!getValues('batchSchedule') || !getValues('batchMode'))) {
      const match = savedBatch.match(/^(.*?)\s*\((.*?)\)$/);
      if (match) {
        setValue('batchSchedule', match[1]);
        setValue('batchMode', match[2]);
      }
    }
  }, [getValues, setValue]);

  return (
    <div className="form-step">
      <h2 className="step-title">Course Details</h2>
      <p className="step-subtitle">Select the course you wish to enroll in and your preferred batch schedule.</p>

      {/* ── Section 1: Course Selection (Subtle Brand Tint 1) ── */}
      <div
        className="form-section-card mb-3"
        style={{
          background: '#f8faf9',
          border: '1px solid #dbe6e0',
          borderRadius: '10px',
          padding: '14px 14px',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#161439',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <i className="fas fa-graduation-cap" style={{ color: '#1a3f32', fontSize: '15px' }}></i>
          <span>Course Selected *</span>
        </div>

        <div className="course-selection-grid">
          {COURSES.map((course) => {
            const isSelected = selectedCourse === course.title;
            return (
              <label
                key={course.title}
                className={`course-option-compact ${isSelected ? 'course-option-compact--active' : ''}`}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
                  <input
                    type="radio"
                    value={course.title}
                    {...register('course', { required: 'Please select a course' })}
                    style={{
                      width: '16px',
                      height: '16px',
                      accentColor: '#1a3f32',
                      flexShrink: 0,
                      cursor: 'pointer',
                    }}
                  />
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: isSelected ? 600 : 500,
                      color: isSelected ? '#1a3f32' : '#222222',
                      lineHeight: 1.25,
                    }}
                  >
                    {course.title}
                  </span>
                </div>
              </label>
            );
          })}
        </div>
        {errors.course && <span className="form-error mt-2 d-block">{errors.course.message as string}</span>}
      </div>

      {/* ── Section 2: Preferred Batch Schedule (Subtle Brand Tint 2) ── */}
      <div
        className="form-section-card mb-3"
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
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <i className="fas fa-calendar-alt" style={{ color: '#1a3f32', fontSize: '14px' }}></i>
          <span>Preferred Batch Schedule *</span>
        </div>

        <div className="batch-options-grid">
          {BATCH_SCHEDULES.map((sched) => {
            const isSelected = selectedSchedule === sched;
            return (
              <label
                key={sched}
                className={`batch-option-pill ${isSelected ? 'batch-option-pill--active' : ''}`}
              >
                <input
                  type="radio"
                  value={sched}
                  {...register('batchSchedule', { required: 'Please select a batch schedule' })}
                  style={{
                    width: '15px',
                    height: '15px',
                    accentColor: '#1a3f32',
                    flexShrink: 0,
                    cursor: 'pointer',
                  }}
                />
                <span>{sched}</span>
              </label>
            );
          })}
        </div>
        {errors.batchSchedule && (
          <span className="form-error mt-1 d-block">{errors.batchSchedule.message as string}</span>
        )}
      </div>

      {/* ── Section 3: Learning Mode (Subtle Brand Tint 3) ── */}
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
            fontSize: '13.5px',
            fontWeight: 700,
            color: '#161439',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <i className="fas fa-chalkboard-teacher" style={{ color: '#1a3f32', fontSize: '14px' }}></i>
          <span>Learning Mode *</span>
        </div>

        <div className="batch-options-grid">
          {BATCH_MODES.map((mode) => {
            const isSelected = selectedMode === mode;
            return (
              <label
                key={mode}
                className={`batch-option-pill ${isSelected ? 'batch-option-pill--active' : ''}`}
              >
                <input
                  type="radio"
                  value={mode}
                  {...register('batchMode', { required: 'Please select a learning mode' })}
                  style={{
                    width: '15px',
                    height: '15px',
                    accentColor: '#1a3f32',
                    flexShrink: 0,
                    cursor: 'pointer',
                  }}
                />
                <span>{mode}</span>
              </label>
            );
          })}
        </div>
        {errors.batchMode && <span className="form-error mt-1 d-block">{errors.batchMode.message as string}</span>}
      </div>

      {/* Hidden batch input for final form value */}
      <input
        type="hidden"
        {...register('batch', { required: 'Please select both your preferred schedule and learning mode' })}
      />
      {errors.batch && !errors.batchSchedule && !errors.batchMode && (
        <span className="form-error mt-1 d-block">{errors.batch.message as string}</span>
      )}

      {/* Dynamic selection summary - Compact Strip */}
      {(selectedCourse || selectedSchedule || selectedMode) && (
        <div
          style={{
            padding: '8px 12px',
            background: '#ffffff',
            border: '1px solid #1a3f32',
            borderRadius: '8px',
            fontSize: '12.5px',
            color: '#161439',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '6px',
          }}
        >
          <div>
            <span style={{ color: '#666', marginRight: '6px' }}>Enrolling:</span>
            <strong style={{ color: '#1a3f32' }}>{selectedCourse || '—'}</strong>
          </div>
          <div>
            <span style={{ color: '#666', marginRight: '6px' }}>Schedule:</span>
            <span style={{ color: '#1a3f32', fontWeight: 600 }}>{selectedSchedule || '—'}</span>
            <span style={{ color: '#999', margin: '0 6px' }}>•</span>
            <span style={{ color: '#1a3f32', fontWeight: 600 }}>{selectedMode || '—'}</span>
          </div>
        </div>
      )}
    </div>
  );
}
