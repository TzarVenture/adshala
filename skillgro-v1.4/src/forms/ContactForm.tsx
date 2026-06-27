'use client'
import { useState } from 'react'
import BtnArrow from '@/svg/BtnArrow'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    phone: '',
    message: '',
  })

const [status, setStatus] = useState<{
  loading: boolean;
  success: boolean | null;
  message: string;
}>({
  loading: false,
  success: null,
  message: '',
})

  const handleChange = (e:any) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    setStatus({ loading: true, success: null, message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setStatus({
          loading: false,
          success: true,
          message: 'Message sent successfully!',
        })
        setFormData({ user_name: '', user_email: '', phone: '', message: '' })
      } else {
        setStatus({
          loading: false,
          success: false,
          message: result.error || 'Something went wrong.',
        })
      }
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        message: 'Network error. Please try again later.',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} id="contact-form">
      <div className="row">
        <div className="col-md-4">
          <div className="form-grp">
            <input
              name="user_name"
              type="text"
              placeholder="Name *"
              value={formData.user_name}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-grp">
            <input
              name="user_email"
              type="email"
              placeholder="E-mail *"
              value={formData.user_email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-grp">
            <input
              type="tel"
              name="phone"
              placeholder="Phone *"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="form-grp">
        <textarea
          name="message"
          placeholder="Comment"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-two arrow-btn" disabled={status.loading}>
        {status.loading ? 'Sending...' : 'Submit Now'} <BtnArrow />
      </button>

      {status.success === true && (
        <p className="text-success mt-2">✅ {status.message}</p>
      )}
      {status.success === false && (
        <p className="text-danger mt-2">❌ {status.message}</p>
      )}
    </form>
  )
}