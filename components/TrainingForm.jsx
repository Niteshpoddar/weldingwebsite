'use client'

import { useState } from 'react'
import Button from './Button'
import { isValidEmail, isValidPhone } from '../lib/utils'

export default function TrainingForm({ courseName = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    course: courseName,
    trainingType: '',
    participants: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState({})
  const form = new FormData();


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
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
    if (!formData.company.trim()) newErrors.company = 'Company name is required'
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }
    if (!formData.course.trim()) newErrors.course = 'Please select a course'
    if (!formData.trainingType.trim()) newErrors.trainingType = 'Please select training type'
    if (!formData.participants.trim()) newErrors.participants = 'Number of participants is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("phone", parseInt(formData.phone, 10));
    form.append("company", formData.company);
    form.append("course", formData.course);
    form.append("trainingType", formData.trainingType);
    form.append("participants", formData.participants);
    form.append("message", formData.message);
    try {
      const response = await fetch('/api/training-form', {
        method: 'POST',
        body:form,
      })

      const result = await response.json()

      if (result.success) {
        setSuccess(true)
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          course: '',
          trainingType: '',
          participants: '',
          message: ''
        })
      } else {
        throw new Error(result.error || 'Failed to submit registration')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrors({ submit: 'Failed to submit registration. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="card p-8 text-center">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-2xl font-bold text-primary-900 mb-4">
          Registration Successful!
        </h3>
        <p className="text-primary-600 mb-6">
          Thank you for registering for our training program. Our team will contact you 
          within 2 business days to discuss the details and schedule.
        </p>
        <Button onClick={() => setSuccess(false)} variant="secondary">
          Register for Another Course
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="card p-8 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-primary-900 mb-2">
            Contact Person *
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
            placeholder="your.email@company.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="company" className="block text-sm font-semibold text-primary-900 mb-2">
            Company Name *
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
          {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
        </div>

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
      </div>

      <div>
        <label htmlFor="course" className="block text-sm font-semibold text-primary-900 mb-2">
          Training Course *
        </label>
        <input
                    type="text"
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className={`input-field ${errors.course ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Position title"
        />
        {errors.course && <p className="mt-1 text-sm text-red-600">{errors.course}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="trainingType" className="block text-sm font-semibold text-primary-900 mb-2">
            Training Format *
          </label>
          <select
            id="trainingType"
            name="trainingType"
            value={formData.trainingType}
            onChange={handleChange}
            className={`input-field ${errors.trainingType ? 'border-red-500 focus:ring-red-500' : ''}`}
          >
            <option value="">Select format</option>
            <option value="On-site Training">On-site Training</option>
            <option value="Virtual Training">Virtual Training</option>
            <option value="Blended Learning">Blended Learning</option>
          </select>
          {errors.trainingType && <p className="mt-1 text-sm text-red-600">{errors.trainingType}</p>}
        </div>

        <div>
          <label htmlFor="participants" className="block text-sm font-semibold text-primary-900 mb-2">
            Number of Participants *
          </label>
          <select
            id="participants"
            name="participants"
            value={formData.participants}
            onChange={handleChange}
            className={`input-field ${errors.participants ? 'border-red-500 focus:ring-red-500' : ''}`}
          >
            <option value="">Select number</option>
            <option value="1-5">1-5 people</option>
            <option value="6-10">6-10 people</option>
            <option value="11-20">11-20 people</option>
            <option value="21-50">21-50 people</option>
            <option value="50+">50+ people</option>
          </select>
          {errors.participants && <p className="mt-1 text-sm text-red-600">{errors.participants}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-primary-900 mb-2">
          Additional Requirements
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="input-field resize-none"
          placeholder="Any specific requirements or questions about the training program..."
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
          {loading ? 'Submitting...' : 'Register for Training'}
        </Button>
      </div>
    </form>
  )
}
