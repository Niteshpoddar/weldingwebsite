'use client'

import { useState } from 'react'
import Button from './Button'
import { isValidEmail, isValidPhone } from '../lib/utils'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState({})
  const form = new FormData();

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
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
    if (!formData.company.trim()) newErrors.company = 'Company is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    if (formData.phone && !formData.phone.match(/^\+91\d{10}$/)) {
      newErrors.phone = 'Phone number must be in format +919876543210 (10 digits after +91)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("phone", formData.phone || '');
    form.append("company", formData.company);
    form.append("message", formData.message);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: form,
      })

      const result = await response.json()

      if (result.success) {
        setSuccess(true)
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          message: ''
        })
      } else {
        throw new Error(result.error || 'Failed to send message')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrors({ submit: 'Failed to send message. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="card p-8 text-center animate-scale-in">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center animate-bounce-gentle">
          <CheckCircleIcon className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-primary-900 mb-4">
          Message Sent Successfully!
        </h3>
        <p className="text-primary-700 mb-6">
          Thank you for contacting us. We'll get back to you within 24 hours.
        </p>
        <Button onClick={() => setSuccess(false)} variant="secondary">
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="card p-8 space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
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

        <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
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
        <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
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

        <div className="animate-slide-up" style={{ animationDelay: '400ms' }}>
          <label htmlFor="phone" className="block text-sm font-semibold text-primary-900 mb-2">
            Phone Number
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
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>
      </div>

      <div className="animate-slide-up" style={{ animationDelay: '500ms' }}>
        <label htmlFor="message" className="block text-sm font-semibold text-primary-900 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={`input-field resize-none ${errors.message ? 'border-red-500 focus:ring-red-500' : ''}`}
          placeholder="Tell us about your project or how we can help you..."
        />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
      </div>

      {errors.submit && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg animate-slide-up">
          <p className="text-sm text-red-600">{errors.submit}</p>
        </div>
      )}

      <div className="flex justify-end animate-slide-up" style={{ animationDelay: '600ms' }}>
        <Button 
          type="submit" 
          loading={loading}
          disabled={loading}
          size="lg"
          className="w-full sm:w-auto"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </Button>
      </div>
    </form>
  )
}
