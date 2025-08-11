'use client'

import { useState, useEffect } from 'react'
import Button from './Button'
import { isValidEmail, isValidPhone } from '../lib/utils'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

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
  const [currentStep, setCurrentStep] = useState(1)
  const [formProgress, setFormProgress] = useState(0)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
    calculateFormProgress()
  }

  const calculateFormProgress = () => {
    const totalFields = 7 // name, email, phone, position, experience, resume, coverLetter
    const filledFields = Object.values(formData).filter(value => 
      value && (typeof value === 'string' ? value.trim() !== '' : true)
    ).length
    const progress = (filledFields / totalFields) * 100
    setFormProgress(Math.min(progress, 100))
  }

  useEffect(() => {
    calculateFormProgress()
  }, [])

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
    if (!formData.position.trim()) newErrors.position = 'Position is required'
    if (!formData.experience.trim()) newErrors.experience = 'Experience is required'
    if (!formData.resume) newErrors.resume = 'Resume is required'
    if (!formData.coverLetter.trim()) newErrors.coverLetter = 'Cover letter is required'

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
      formDataToSend.append('position', formData.position)
      formDataToSend.append('yearsOfExperience', formData.experience)
      formDataToSend.append('coverLetterText', formData.coverLetter || '')

      const response = await fetch('/api/resume-upload', {
        method: 'POST',
        body: formDataToSend,
      })

      const result = await response.json()

      if (result.success) {
        setSuccess(true)
        console.log('Resume uploaded to Cloudinary:', result.resumeUrl)
        console.log('Application ID:', result.applicationId)
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
      <div className="card p-12 text-center animate-scale-in">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center animate-bounce-gentle">
          <CheckCircleIcon className="w-10 h-10 text-green-600" />
        </div>
        <div className="space-y-4 mb-8">
          <h3 className="text-3xl font-bold text-primary-900">
            Application Submitted Successfully!
          </h3>
          <div className="flex items-center justify-center gap-2 text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm">Processing your application...</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <span className="text-sm">Sending confirmation...</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
        <p className="text-primary-700 mb-8 text-lg leading-relaxed">
          Thank you for your interest in joining our team. We'll review your application 
          and get back to you within 5 business days.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => window.location.href = '/careers'} variant="secondary">
            View Other Positions
          </Button>
          <Button onClick={() => setSuccess(false)} variant="primary">
            Submit Another Application
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="card p-10 lg:p-12 space-y-8 animate-fade-in">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-primary-700">Form Progress</span>
          <span className="text-sm font-medium text-primary-900">{Math.round(formProgress)}%</span>
        </div>
        <div className="w-full bg-primary-200 rounded-full h-2">
          <div 
            className="bg-primary-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${formProgress}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-primary-600">
          <span>Personal Info</span>
          <span>Professional</span>
          <span>Resume</span>
          <span>Cover Letter</span>
        </div>
      </div>

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
              style={{ fontSize: '16px' }} // Prevents zoom on iOS
              autoComplete="name"
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
              style={{ fontSize: '16px' }} // Prevents zoom on iOS
              autoComplete="email"
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
              style={{ fontSize: '16px' }} // Prevents zoom on iOS
              autoComplete="tel"
              inputMode="numeric"
            />
            {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '400ms' }}>
            <label htmlFor="position" className="block text-sm font-semibold text-primary-900 mb-3">
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
              style={{ fontSize: '16px' }} // Prevents zoom on iOS
              autoComplete="organization-title"
            />
            {errors.position && <p className="mt-2 text-sm text-red-600">{errors.position}</p>}
          </div>
        </div>
      </div>

      {/* Professional Information Section */}
      <div className="space-y-8 pt-8 border-t border-primary-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-primary-900 mb-2">Professional Information</h2>
          <p className="text-primary-600">Tell us about your experience and qualifications</p>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: '500ms' }}>
          <label htmlFor="experience" className="block text-sm font-semibold text-primary-900 mb-3">
            Years of Experience *
          </label>
          <select
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className={`input-field ${errors.experience ? 'border-red-500 focus:ring-red-500' : ''}`}
            style={{ fontSize: '16px' }} // Prevents zoom on iOS
          >
            <option value="">Select experience level</option>
            <option value="0-1">0-1 years</option>
            <option value="2-3">2-3 years</option>
            <option value="4-5">4-5 years</option>
            <option value="6-10">6-10 years</option>
            <option value="10+">10+ years</option>
          </select>
          {errors.experience && <p className="mt-2 text-sm text-red-600">{errors.experience}</p>}
        </div>

        <div className="animate-slide-up" style={{ animationDelay: '600ms' }}>
                      <label htmlFor="resume" className="block text-sm font-semibold text-primary-900 mb-3">
              Resume (PDF Document) *
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

      {/* Cover Letter Section */}
      <div className="space-y-6 pt-8 border-t border-primary-100">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-primary-900 mb-2">Cover Letter</h2>
          <p className="text-primary-600">Tell us why you're the perfect fit for this position</p>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: '700ms' }}>
          <label htmlFor="coverLetter" className="block text-sm font-semibold text-primary-900 mb-3">
            Cover Letter *
          </label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            rows={8}
            className="input-field resize-none"
            placeholder="Tell us why you're interested in this position and what makes you a great fit..."
            style={{ fontSize: '16px' }} // Prevents zoom on iOS
            autoComplete="off"
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
          className="w-full sm:w-auto px-12 py-4 text-lg min-h-[48px] touch-manipulation"
        >
          {loading ? 'Submitting...' : 'Submit Application'}
        </Button>
      </div>
    </form>
  )
}

