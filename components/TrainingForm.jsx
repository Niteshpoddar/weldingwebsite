'use client'

import { useState } from 'react'
import Button from './Button'
import { isValidEmail, isValidPhone } from '../lib/utils'
import { BookOpenIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export default function TrainingForm({ trainingCourse = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    trainingCourse: trainingCourse,
    company: '',
    resume: null,
    message: ''
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
      // Validate file type - PDF only for better compatibility
      const allowedTypes = ['application/pdf']
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, resume: 'Please upload a PDF document only' }))
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
    } else if (!formData.phone.match(/^\+91\d{10}$/)) {
      newErrors.phone = 'Phone number must be in format +919876543210 (10 digits after +91)'
    }
    if (!formData.trainingCourse.trim()) newErrors.trainingCourse = 'Training course is required'
    if (!formData.company.trim()) newErrors.company = 'Company is required'
    if (!formData.resume) newErrors.resume = 'Resume is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      const formDataToSend = new FormData()
      
      // Map form fields to match the API expectations
      formDataToSend.append('file', formData.resume)
      formDataToSend.append('fullName', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('company', formData.company)
      formDataToSend.append('trainingCourse', formData.trainingCourse)
      formDataToSend.append('numberOfParticipants', '1') // Default to 1 for individual registration
      formDataToSend.append('trainingFormat', 'On-site') // Default format
      formDataToSend.append('additionalRequirement', formData.message || '')

      const response = await fetch('/api/training-resume-upload', {
        method: 'POST',
        body: formDataToSend,
      })

      const result = await response.json()

      if (result.success) {
        setSuccess(true)
        console.log('Resume uploaded to Cloudinary:', result.resumeUrl)
        console.log('Application ID:', result.applicationId)
      } else {
        throw new Error(result.error || 'Failed to submit registration')
      }
    } catch (error) {
      console.error('Error submitting registration:', error)
      setErrors({ submit: 'Failed to submit registration. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="card p-12 text-center animate-scale-in">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center animate-bounce-gentle">
          <CheckCircleIcon className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-3xl font-bold text-primary-900 mb-6">
          Registration Submitted Successfully!
        </h3>
        <p className="text-primary-700 mb-8 text-lg leading-relaxed">
          Thank you for your interest in our training programs. We'll review your registration 
          and get back to you within 3 business days with confirmation details.
        </p>
        <Button onClick={() => window.location.href = '/training'} variant="secondary">
          View Other Training Programs
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="card p-10 lg:p-12 space-y-8 animate-fade-in">
      {/* Personal Information Section */}
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-primary-900 mb-2">Personal Information</h2>
          <p className="text-primary-600">Please provide your basic contact details</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
            <label htmlFor="name" className="block text-sm font-semibold text-primary-900 mb-3">
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
            {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
            <label htmlFor="email" className="block text-sm font-semibold text-primary-900 mb-3">
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
            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
            <label htmlFor="phone" className="block text-sm font-semibold text-primary-900 mb-3">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              maxLength={13}
              className={`input-field ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="+919876543210"
            />
            {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '400ms' }}>
            <label htmlFor="company" className="block text-sm font-semibold text-primary-900 mb-3">
              Company *
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={`input-field ${errors.company ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Your company name"
            />
            {errors.company && <p className="mt-2 text-sm text-red-600">{errors.company}</p>}
          </div>
        </div>
      </div>

      {/* Training Information Section */}
      <div className="space-y-8 pt-8 border-t border-primary-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-primary-900 mb-2">Training Information</h2>
          <p className="text-primary-600">Tell us about your training preferences</p>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: '500ms' }}>
          <label htmlFor="trainingCourse" className="block text-sm font-semibold text-primary-900 mb-3">
            Training Course *
          </label>
          <select
            id="trainingCourse"
            name="trainingCourse"
            value={formData.trainingCourse}
            onChange={handleChange}
            className={`input-field ${errors.trainingCourse ? 'border-red-500 focus:ring-red-500' : ''}`}
          >
            <option value="">Select training course</option>
            <option value="Welding Fundamentals">Welding Fundamentals</option>
            <option value="Advanced Welding Techniques">Advanced Welding Techniques</option>
            <option value="Safety & Compliance">Safety & Compliance</option>
            <option value="Quality Control">Quality Control</option>
            <option value="Equipment Maintenance">Equipment Maintenance</option>
            <option value="Custom Training">Custom Training</option>
          </select>
          {errors.trainingCourse && <p className="mt-2 text-sm text-red-600">{errors.trainingCourse}</p>}
        </div>

        <div className="animate-slide-up" style={{ animationDelay: '600ms' }}>
                      <label htmlFor="resume" className="block text-sm font-semibold text-primary-900 mb-3">
              Resume (PDF Document)
            </label>
            <div className="border-2 border-dashed border-primary-200 rounded-lg p-6 text-center hover:border-primary-300 transition-colors duration-200">
              <input
                type="file"
                id="resume"
                name="resume"
                onChange={handleFileChange}
                accept=".pdf"
                className={`hidden ${errors.resume ? 'border-red-500 focus:ring-red-500' : ''}`}
              />
            <label htmlFor="resume" className="cursor-pointer">
              {!formData.resume ? (
                <div className="space-y-3">
                  <div className="w-12 h-12 mx-auto bg-primary-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-primary-900 font-medium">Click to upload resume</p>
                    <p className="text-sm text-primary-600">PDF only (max 5MB)</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-green-700 font-medium">Resume Attached ✓</p>
                    <p className="text-sm text-primary-600 font-mono">{formData.resume.name}</p>
                    <p className="text-xs text-primary-500">Click to change file</p>
                  </div>
                </div>
              )}
            </label>
          </div>
          {errors.resume && <p className="mt-2 text-sm text-red-600">{errors.resume}</p>}
        </div>
      </div>

      {/* Message Section */}
      <div className="space-y-6 pt-8 border-t border-primary-100">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-primary-900 mb-2">Additional Information</h2>
          <p className="text-primary-600">Tell us about your training goals and requirements</p>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: '700ms' }}>
          <label htmlFor="message" className="block text-sm font-semibold text-primary-900 mb-3">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={8}
            className="input-field resize-none"
            placeholder="Tell us about your training goals, specific requirements, or any questions you may have..."
          />
        </div>
      </div>

      {/* Error Messages */}
      {errors.submit && (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg animate-slide-up">
          <p className="text-sm text-red-600">{errors.submit}</p>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-center pt-8 border-t border-primary-100 animate-slide-up" style={{ animationDelay: '800ms' }}>
        <Button 
          type="submit" 
          loading={loading}
          disabled={loading}
          size="lg"
          className="w-full sm:w-auto px-12 py-4 text-lg"
        >
          {loading ? 'Submitting...' : 'Submit Registration'}
        </Button>
      </div>
    </form>
  )
}
