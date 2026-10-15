'use client';

import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';

import StepPersonal from './StepPersonal';
import StepProfessional from './StepProfessional';
import StepCourse from './StepCourse';
import StepBackground from './StepBackground';
import StepDocuments from './StepDocuments';
import StepPayment from './StepPayment';
import StepDeclaration from './StepDeclaration';

import './Registration.css';

const steps = [
  { id: 1, component: StepPersonal },
  { id: 2, component: StepProfessional },
  { id: 3, component: StepCourse },
  { id: 4, component: StepBackground },
  { id: 5, component: StepDocuments },
  { id: 6, component: StepDeclaration }, // Emergency Contact and Terms
  { id: 7, component: StepPayment },
];

const FORM_STORAGE_KEY = 'adshaala_registration_form_data';
const STEP_STORAGE_KEY = 'adshaala_registration_current_step';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  const methods = useForm({
    mode: 'onTouched',
    defaultValues: {
      name: '', email: '', phone: '', dob: '', city: '',
      professionalStatus: '', company: '', designation: '', experience: '',
      course: '', coursePrice: 0, batch: '', batchSchedule: '', batchMode: '',
      source: '', goals: '',
      documentMode: '', aadhaarFile: null, secondaryIdType: '', secondaryFile: null, offlineAck: false,
      paymentType: '', paymentAmount: Number(process.env.NEXT_PUBLIC_MIN_FEE) || 1,
      emergencyName: '', emergencyRelation: '', emergencyPhone: '',
      docAck: false, declaration: false,
    }
  });

  const { trigger, handleSubmit, watch, reset, setError } = methods;

  useEffect(() => {
    const savedData = localStorage.getItem(FORM_STORAGE_KEY);
    const savedStep = localStorage.getItem(STEP_STORAGE_KEY);
    if (savedData) reset(JSON.parse(savedData));
    if (savedStep) setCurrentStep(Number(savedStep));
    setIsMounted(true);
  }, [reset]);

  useEffect(() => {
    if (isMounted) {
      const subscription = watch((value) => {
        // Don't stringify FileLists for localstorage, it will break or serialize to {}
        const safeValue = { ...value, aadhaarFile: null, secondaryFile: null };
        localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(safeValue));
      });
      localStorage.setItem(STEP_STORAGE_KEY, currentStep.toString());
      return () => subscription.unsubscribe();
    }
  }, [watch, currentStep, isMounted]);

  const nextStep = async () => {
    let fieldsToValidate: string[] = [];
    if (currentStep === 0) fieldsToValidate = ['name', 'email', 'phone', 'dob', 'city'];
    else if (currentStep === 1) {
      fieldsToValidate = ['professionalStatus'];
      const status = methods.getValues('professionalStatus');
      if (['Working Professional', 'Business Owner', 'Freelancer'].includes(status)) {
        fieldsToValidate.push('company', 'designation', 'experience');
      }
    }
    else if (currentStep === 2) fieldsToValidate = ['course', 'batch', 'batchSchedule', 'batchMode'];
    else if (currentStep === 3) fieldsToValidate = ['source', 'goals'];
    else if (currentStep === 4) {
      fieldsToValidate = ['documentMode'];
      const mode = methods.getValues('documentMode');
      if (mode === 'online') fieldsToValidate.push('aadhaarFile', 'secondaryIdType', 'secondaryFile');
      if (mode === 'offline') fieldsToValidate.push('offlineAck');
    }
    else if (currentStep === 5) {
      fieldsToValidate = ['emergencyName', 'emergencyRelation', 'emergencyPhone', 'declaration'];
    }
    else if (currentStep === 6) {
      fieldsToValidate = ['paymentType', 'paymentAmount'];
    }

    const isStepValid = await trigger(fieldsToValidate as any);

    if (isStepValid && currentStep === 0) {
      setIsValidating(true);
      try {
        const email = methods.getValues('email');
        const phone = methods.getValues('phone');
        const res = await fetch('/api/check-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, phone })
        });
        const data = await res.json();
        if (data.exists) {
          setError('email', { type: 'manual', message: 'This email or phone is already registered.' });
          setIsValidating(false);
          return;
        }
      } catch (err) {
        console.error('Validation error:', err);
      }
      setIsValidating(false);
    }

    if (isStepValid) setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setServerError('');

    try {
      // 1. Create payment order in the backend
      const orderResponse = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: data.paymentAmount,
          course: data.course,
          name: data.name,
          email: data.email,
          phone: data.phone,
        }),
      });

      const orderResult = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(orderResult.error || 'Failed to initialize payment gateway order.');
      }

      // 2. Load the Razorpay Checkout SDK
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay SDK. Please check your internet connection.');
      }

      // 3. Define Razorpay checkout options with customized Adshalaa branding
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
        amount: orderResult.amount,
        currency: orderResult.currency,
        name: 'Adshalaa (by Tzar Digital)',
        description: `Course Registration Fee - ${data.course}`,
        image: typeof window !== 'undefined' && window.location.protocol === 'https:'
          ? `${window.location.origin}/Adshalaa_Logo.png`
          : 'https://www.adshalaa.com/Adshalaa_Logo.png',
        order_id: orderResult.order_id,
        handler: async function (response: any) {
          try {
            setIsSubmitting(true);
            setServerError('');

            // Package final form data including files and payment details
            const formData = new FormData();
            Object.keys(data).forEach(key => {
              if (key === 'aadhaarFile' || key === 'secondaryFile') {
                if (data[key] && data[key].length > 0) formData.append(key, data[key][0]);
              } else {
                formData.append(key, data[key]);
              }
            });

            // Append signature verification parameters
            formData.append('razorpay_payment_id', response.razorpay_payment_id);
            formData.append('razorpay_order_id', response.razorpay_order_id);
            formData.append('razorpay_signature', response.razorpay_signature);

            const regResponse = await fetch('/api/student-register', {
              method: 'POST',
              body: formData,
            });

            const regResult = await regResponse.json();

            if (regResponse.ok) {
              setSubmitStatus('success');
              localStorage.setItem('adshaala_last_payment_id', response.razorpay_payment_id);
              localStorage.removeItem(FORM_STORAGE_KEY);
              localStorage.removeItem(STEP_STORAGE_KEY);
              localStorage.removeItem('adshaala_registration_status');
              localStorage.removeItem('adshaala_registration_summary');
              window.location.href = `/student-registration/success?paymentId=${encodeURIComponent(response.razorpay_payment_id)}`;
              return;
            } else {
              setSubmitStatus('error');
              setServerError(regResult.error || 'Failed to verify transaction and submit registration.');
            }
          } catch (err) {
            setSubmitStatus('error');
            setServerError('A network error occurred during transaction verification.');
          } finally {
            setIsSubmitting(false);
          }
        },
        prefill: {
          name: data.name,
          email: data.email,
          contact: data.phone,
        },
        theme: {
          color: '#1a3f32', // Adshalaa theme color
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false);
          },
        },
      };

      const razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.open();

    } catch (err: any) {
      setSubmitStatus('error');
      setServerError(err.message || 'An error occurred during payment initiation.');
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="registration-container" style={{ padding: '60px 0', textAlign: 'center' }}>
        <div className="registration-card" style={{ maxWidth: '480px', margin: '0 auto', padding: '36px 20px', textAlign: 'center' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: '#e8f5e9',
              color: '#2e7d32',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              marginBottom: '14px'
            }}
          >
            <i className="fas fa-check"></i>
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#161439', margin: '0 0 6px 0' }}>
            Payment Successful
          </h3>
          <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>
            Redirecting to your verified registration receipt...
          </p>
        </div>
      </div>
    );
  }

  const CurrentComponent = steps[currentStep].component;

  return (
    <div className="registration-container">
      <div className="registration-card">
        {/* Progress Bar */}
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`progress-step ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
            >
              {index < currentStep ? '✓' : step.id}
            </div>
          ))}
        </div>

        {/* Form Content */}
        <FormProvider {...methods}>
          <form onSubmit={(e) => e.preventDefault()} noValidate>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CurrentComponent />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Actions */}
            <div className="step-actions">
              <button
                type="button"
                className="btn-prev"
                onClick={prevStep}
                style={{ visibility: currentStep === 0 ? 'hidden' : 'visible' }}
                disabled={isSubmitting}
              >
                ← Back
              </button>

              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  className="btn-next"
                  onClick={nextStep}
                  disabled={isValidating}
                >
                  {isValidating ? 'Checking...' : 'Save & Continue →'}
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-next btn-submit"
                  disabled={isSubmitting}
                  onClick={handleSubmit(onSubmit)}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Registration ✓'}
                </button>
              )}
            </div>

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div className="form-error-banner mt-4 p-3 bg-danger text-white rounded text-center">
                {serverError}
              </div>
            )}
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
