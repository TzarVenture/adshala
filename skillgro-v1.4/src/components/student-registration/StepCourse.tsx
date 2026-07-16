'use client';
import { useFormContext } from 'react-hook-form';
import course_data from '@/data/home-data/CourseData';

// Fetch the main courses from the first home variant
const COURSES = course_data[0].course_details.map(c => ({
  title: c.title,
  price: c.price
}));

const BATCHES = [
  'Weekday Morning',
  'Weekday Evening',
  'Weekend',
  'Online',
  'Offline',
  'Hybrid'
];

export default function StepCourse() {
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  
  // Watch the selected course so we can style it if needed, or update the price
  const selectedCourse = watch('course');

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
                {...register('course', { 
                  required: 'Please select a course',
                  onChange: (e) => {
                    const price = COURSES.find(c => c.title === e.target.value)?.price || 0;
                    setValue('coursePrice', price);
                  }
                })}
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
              {...register('course', { 
                required: 'Please select a course',
                onChange: () => setValue('coursePrice', 0)
              })}
            />
            <span>Other</span>
          </label>
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
