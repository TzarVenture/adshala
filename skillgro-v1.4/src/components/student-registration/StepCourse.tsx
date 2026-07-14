'use client';
import { useFormContext } from 'react-hook-form';

const COURSES = [
  'AI Powered Digital Marketing Advanced Certification',
  'SEO Master Program',
  'Google Ads Certification',
  'Social Media Marketing',
  'Performance Marketing',
  'Content Marketing',
  'E-commerce Marketing',
  'Other'
];

const BATCHES = [
  'Weekday Morning',
  'Weekday Evening',
  'Weekend',
  'Online',
  'Offline'
];

export default function StepCourse() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="form-step">
      <h2 className="step-title">Course Details</h2>
      <p className="step-subtitle">Select the course you wish to enroll in and your preferred batch.</p>

      <div className="form-field mb-4">
        <label>Course Selected *</label>
        <div className="radio-group-grid mt-2">
          {COURSES.map((course) => (
            <label key={course} className="custom-radio">
              <input
                type="radio"
                value={course}
                {...register('course', { required: 'Please select a course' })}
              />
              <span>{course}</span>
            </label>
          ))}
        </div>
        {errors.course && <span className="form-error">{errors.course.message as string}</span>}
      </div>

      <div className="form-field mt-4">
        <label>Preferred Batch *</label>
        <div className="radio-group-grid mt-2">
          {BATCHES.map((batch) => (
            <label key={batch} className="custom-radio">
              <input
                type="radio"
                value={batch}
                {...register('batch', { required: 'Please select a preferred batch' })}
              />
              <span>{batch}</span>
            </label>
          ))}
        </div>
        {errors.batch && <span className="form-error">{errors.batch.message as string}</span>}
      </div>
    </div>
  );
}
