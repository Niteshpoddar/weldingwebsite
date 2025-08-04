// Application constants

// Company information
export const COMPANY_INFO = {
  name: 'Catalogue',
  tagline: 'Premium Solutions',
  email: 'info@catalogue.com',
  supportEmail: 'support@catalogue.com',
  phone: '+1 (234) 567-890',
  supportPhone: '+1 (234) 567-891',
  address: {
    street: '123 Business Avenue',
    suite: 'Suite 100',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
    full: '123 Business Avenue, Suite 100, New York, NY 10001, United States'
  },
  businessHours: {
    weekdays: 'Monday - Friday: 9:00 AM - 6:00 PM',
    saturday: 'Saturday: 10:00 AM - 4:00 PM',
    sunday: 'Sunday: Closed',
    timezone: 'EST'
  },
  founded: '2010',
  employeeCount: '50-100',
  headquarters: 'New York, NY'
}

// Social media links
export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/company/catalogue',
  twitter: 'https://twitter.com/catalogue',
  instagram: 'https://instagram.com/catalogue',
  facebook: 'https://facebook.com/catalogue',
  youtube: 'https://youtube.com/catalogue'
}

// Navigation menu items
export const NAVIGATION_ITEMS = [
  { href: '/', label: 'Home', description: 'Homepage' },
  { href: '/about', label: 'About', description: 'Learn about our company' },
  { href: '/products', label: 'Products', description: 'Browse our products' },
  { href: '/industries', label: 'Industries', description: 'Industry solutions' },
  { href: '/training', label: 'Training', description: 'Professional training' },
  { href: '/careers', label: 'Careers', description: 'Join our team' },
  { href: '/contact', label: 'Contact', description: 'Get in touch' }
]

// API endpoints
export const API_ENDPOINTS = {
  contact: '/api/contact',
  jobApplication: '/api/job-form',
  trainingRegistration: '/api/training-form',
  fileUpload: '/api/resume'
}

// Form validation constants
export const VALIDATION = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  },
  phone: {
    pattern: /^[\+]?[1-9][\d\s\-\(\)]{7,15}$/,
    message: 'Please enter a valid phone number'
  },
  fileUpload: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    message: 'Please upload a PDF or Word document (max 5MB)'
  },
  textLength: {
    name: { min: 2, max: 50 },
    message: { min: 10, max: 1000 },
    company: { min: 2, max: 100 }
  }
}

// UI constants
export const UI_CONSTANTS = {
  headerHeight: '80px',
  mobileHeaderHeight: '64px',
  footerHeight: '200px',
  sidebarWidth: '280px',
  maxContentWidth: '1280px',
  borderRadius: {
    small: '6px',
    medium: '8px',
    large: '12px',
    xl: '16px'
  },
  animations: {
    fast: '200ms',
    normal: '300ms',
    slow: '500ms'
  }
}

// Product categories
export const PRODUCT_CATEGORIES = [
  'Software',
  'Consulting', 
  'Analytics',
  'Infrastructure',
  'Customer Experience',
  'E-commerce',
  'Marketing',
  'Productivity',
  'Security'
]

// Industry sectors
export const INDUSTRY_SECTORS = [
  'Technology',
  'Healthcare', 
  'Finance',
  'Education',
  'Retail & E-commerce',
  'Manufacturing',
  'Government',
  'Non-profit'
]

// Training courses
export const TRAINING_COURSES = [
  'Digital Transformation',
  'Leadership Development',
  'Technical Skills Enhancement',
  'Project Management',
  'Data Analytics',
  'Customer Service Excellence',
  'Sales Training',
  'Cybersecurity Awareness',
  'Custom Training Solution'
]

// Training formats
export const TRAINING_FORMATS = [
  'On-site Training',
  'Virtual Training',
  'Blended Learning'
]

// Job experience levels
export const EXPERIENCE_LEVELS = [
  '0-1 years',
  '2-3 years',
  '4-5 years',
  '6-10 years',
  '10+ years'
]

// Job departments
export const DEPARTMENTS = [
  'Technology',
  'Design',
  'Sales',
  'Marketing',
  'Operations',
  'Human Resources',
  'Finance',
  'Customer Success'
]

// Participant group sizes
export const PARTICIPANT_GROUPS = [
  '1-5 people',
  '6-10 people',
  '11-20 people',
  '21-50 people',
  '50+ people'
]

// Success messages
export const SUCCESS_MESSAGES = {
  contact: 'Message sent successfully! We\'ll get back to you within 24 hours.',
  jobApplication: 'Application submitted successfully! We\'ll review your application and get back to you within 5 business days.',
  trainingRegistration: 'Training registration submitted successfully! Our team will contact you within 2 business days.',
  fileUpload: 'File uploaded successfully!'
}

// Error messages
export const ERROR_MESSAGES = {
  generic: 'Something went wrong. Please try again.',
  network: 'Network error. Please check your connection and try again.',
  validation: 'Please check your input and try again.',
  fileUpload: 'File upload failed. Please try again.',
  email: 'Failed to send email. Please try again.',
  required: 'This field is required',
  invalidEmail: 'Please enter a valid email address',
  invalidPhone: 'Please enter a valid phone number',
  fileTooLarge: 'File size is too large. Maximum size is 5MB.',
  invalidFileType: 'Invalid file type. Please upload a PDF or Word document.'
}

// SEO constants
export const SEO = {
  defaultTitle: 'Catalogue - Premium Solutions',
  titleTemplate: '%s | Catalogue',
  defaultDescription: 'Discover excellence through our curated collection of premium products and services. Where innovation meets sophistication.',
  keywords: 'catalogue, premium solutions, business services, technology, consulting, training',
  author: 'Catalogue Team',
  type: 'website',
  locale: 'en_US',
  siteName: 'Catalogue'
}

// Analytics and tracking
export const ANALYTICS = {
  gtmId: process.env.NEXT_PUBLIC_GTM_ID,
  gaId: process.env.NEXT_PUBLIC_GA_ID,
  events: {
    contactForm: 'contact_form_submission',
    jobApplication: 'job_application_submission', 
    trainingRegistration: 'training_registration',
    productView: 'product_view',
    industryView: 'industry_view'
  }
}

// Feature flags
export const FEATURES = {
  enableAnalytics: !!process.env.NEXT_PUBLIC_GA_ID,
  enableChatbot: false,
  enableDarkMode: false,
  enableMultiLanguage: false,
  enableBlog: false,
  enableEcommerce: false
}

// Theme constants
export const THEME = {
  colors: {
    primary: '#334155',
    secondary: '#64748b',
    accent: '#f97316',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6'
  },
  fonts: {
    heading: 'Playfair Display',
    body: 'Inter',
    mono: 'Monaco'
  },
  breakpoints: {
    sm: '640px',
    md: '768px', 
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
}

// Application metadata
export const APP_METADATA = {
  version: '1.0.0',
  buildDate: new Date().toISOString(),
  environment: process.env.NODE_ENV,
  author: 'Catalogue Development Team',
  license: 'MIT',
  repository: 'https://github.com/company/catalogue-website'
}

// Cookie and privacy settings
export const PRIVACY = {
  cookieConsentRequired: true,
  privacyPolicyUrl: '/privacy-policy',
  termsOfServiceUrl: '/terms-of-service',
  cookiePolicyUrl: '/cookie-policy',
  dataRetentionPeriod: '2 years'
}

// Rate limiting (for API routes)
export const RATE_LIMITS = {
  contact: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5 // 5 requests per window
  },
  jobApplication: {
    windowMs: 60 * 60 * 1000, // 1 hour  
    maxRequests: 3 // 3 applications per hour
  },
  general: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100 // 100 requests per window
  }
}

// Default export for easy access to commonly used constants
export default {
  COMPANY_INFO,
  SOCIAL_LINKS,
  NAVIGATION_ITEMS,
  API_ENDPOINTS,
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
  SEO,
  THEME
}
