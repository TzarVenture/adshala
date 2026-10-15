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
      <p className="step-subtitle">Select the course you wish to enroll in and your preferred batch.</p>

      <div className="form-field mb-4">
        <label>Course Selected *</label>
        <div className="radio-group-grid mt-2">
          {COURSES.map((course) => (
            <label key={course.title} className="custom-radio">
              <input
                type="radio"
                value={course.title}
                {...register('course', { required: 'Please select a course' })}
              />
              <span className="d-flex flex-column">
                <span>{course.title}</span>
              </span>
            </label>
          ))}
          <label className="custom-radio">
            <input
              type="radio"
              value="Other"
              {...register('course', { required: 'Please select a course' })}
            />
            <span>Other</span>
          </label>
        </div>
        {errors.course && <span className="form-error">{errors.course.message as string}</span>}
      </div>

      {/* 1. Schedule Selection */}
      <div className="form-field mt-4">
        <label>Preferred Batch *</label>
        <div className="radio-group-grid mt-2">
          {BATCH_SCHEDULES.map((sched) => (
            <label key={sched} className="custom-radio">
              <input
                type="radio"
                value={sched}
                {...register('batchSchedule', { required: 'Please select a batch schedule' })}
              />
              <span>{sched}</span>
            </label>
          ))}
        </div>
        {errors.batchSchedule && <span className="form-error">{errors.batchSchedule.message as string}</span>}
      </div>

      {/* 2. Mode Selection */}
      <div className="form-field mt-4">
        <label>Learning Mode *</label>
        <div className="radio-group-grid mt-2">
          {BATCH_MODES.map((mode) => (
            <label key={mode} className="custom-radio">
              <input
                type="radio"
                value={mode}
                {...register('batchMode', { required: 'Please select a learning mode' })}
              />
              <span>{mode}</span>
            </label>
          ))}
        </div>
        {errors.batchMode && <span className="form-error">{errors.batchMode.message as string}</span>}
      </div>

      {/* Hidden batch input for final form value */}
      <input
        type="hidden"
        {...register('batch', { required: 'Please select both your preferred schedule and learning mode' })}
      />
      {errors.batch && !errors.batchSchedule && !errors.batchMode && (
        <span className="form-error mt-2 d-block">{errors.batch.message as string}</span>
      )}

      {/* Dynamic selection summary */}
      {(selectedCourse || selectedSchedule || selectedMode) && (
        <div
          style={{
            marginTop: '20px',
            padding: '12px 14px',
            background: '#f8faf9',
            border: '1px solid #d9e5df',
            borderRadius: '8px',
            fontSize: '13px',
            color: '#333',
            lineHeight: '1.5'
          }}
        >
          <div style={{ marginBottom: '4px' }}>
            <span style={{ color: '#666', marginRight: '6px' }}>Course:</span>
            <span style={{ color: '#1a3f32', fontWeight: 600 }}>{selectedCourse || '—'}</span>
          </div>
          <div>
            <span style={{ color: '#666', marginRight: '6px' }}>Batch:</span>
            <span style={{ color: '#1a3f32', fontWeight: 500 }}>{selectedSchedule || '—'}</span>
            <span style={{ color: '#999', margin: '0 8px' }}>•</span>
            <span style={{ color: '#666', marginRight: '6px' }}>Mode:</span>
            <span style={{ color: '#1a3f32', fontWeight: 500 }}>{selectedMode || '—'}</span>
          </div>
        </div>
      )}
    </div>
  );
}
