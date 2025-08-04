'use client'

import { useState } from 'react'
import Button from './Button'
import { isValidEmail, isValidPhone } from '../lib/utils'

export default function JobForm({ position = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: position,
    experience: '',
    resume: null,
    coverLetter: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, resume: 'Please upload a PDF or Word document' }))
        return
      }
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, resume: 'File size must be less than 5MB' }))
        return
      }
      setFormData(prev => ({ ...prev, resume: file }))
      if (errors.resume) {
        setErrors(prev => ({ ...prev, resume: '' }))
      }
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }
    if (!formData.position.trim()) newErrors.position = 'Position is required'
    if (!formData.experience.trim()) newErrors.experience = 'Experience is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      const formDataToSend = new FormData()
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key])
        }
      })

      const response = await fetch('/api/job-form', {
        method: 'POST',
        body: formDataToSend,
      })

      const result = await response.json()

      if (result.success) {
        setSuccess(true)
      } else {
        throw new Error(result.error || 'Failed to submit application')
      }
    } catch (error) {
      console.error('Error submitting application:', error)
      setErrors({ submit: 'Failed to submit application. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="card p-8 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-primary-900 mb-4">
          Application Submitted Successfully!
        </h3>
        <p className="text-primary-600 mb-6">
          Thank you for your interest in joining our team. We'll review your application 
          and get back to you within 5 business days.
        </p>
        <Button onClick={() => window.location.href = '/careers'} variant="secondary">
          View Other Positions
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="card p-8 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-primary-900 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`input-field ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
            placeholder="Your full name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-primary-900 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`input-field ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
            placeholder="your.email@example.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-primary-900 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`input-field ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
            placeholder="+1 (234) 567-890"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="position" className="block text-sm font-semibold text-primary-900 mb-2">
            Position Applied For *
          </label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className={`input-field ${errors.position ? 'border-red-500 focus:ring-red-500' : ''}`}
            placeholder="Position title"
          />
          {errors.position && <p className="mt-1 text-sm text-red-600">{errors.position}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="experience" className="block text-sm font-semibold text-primary-900 mb-2">
          Years of Experience *
        </label>
        <select
          id="experience"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          className={`input-field ${errors.experience ? 'border-red-500 focus:ring-red-500' : ''}`}
        >
          <option value="">Select experience level</option>
          <option value="0-1">0-1 years</option>
          <option value="2-3">2-3 years</option>
          <option value="4-5">4-5 years</option>
          <option value="6-10">6-10 years</option>
          <option value="10+">10+ years</option>
        </select>
        {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience}</p>}
      </div>

      <div>
        <label htmlFor="resume" className="block text-sm font-semibold text-primary-900 mb-2">
          Resume (PDF or Word Document)
        </label>
        <input
          type="file"
          id="resume"
          name="resume"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx"
          className={`input-field ${errors.resume ? 'border-red-500 focus:ring-red-500' : ''}`}
        />
        <p className="mt-1 text-xs text-primary-500">Maximum file size: 5MB</p>
        {errors.resume && <p className="mt-1 text-sm text-red-600">{errors.resume}</p>}
      </div>

      <div>
        <label htmlFor="coverLetter" className="block text-sm font-semibold text-primary-900 mb-2">
          Cover Letter
        </label>
        <textarea
          id="coverLetter"
          name="coverLetter"
          value={formData.coverLetter}
          onChange={handleChange}
          rows={6}
          className="input-field resize-none"
          placeholder="Tell us why you're interested in this position and what makes you a great fit..."
        />
      </div>

      {errors.submit && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{errors.submit}</p>
        </div>
      )}

      <div className="flex justify-end">
        <Button 
          type="submit" 
          loading={loading}
          disabled={loading}
          size="lg"
          className="w-full sm:w-auto"
        >
          {loading ? 'Submitting...' : 'Submit Application'}
        </Button>
      </div>
    </form>
  )
}

