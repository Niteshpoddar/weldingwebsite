import { forwardRef } from 'react'

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  loading = false,
  ...props 
}, ref) => {
  const baseClass = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105'

  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white focus:ring-primary-400 shadow-lg hover:shadow-xl',
    secondary: 'bg-white hover:bg-accent-50 text-primary-800 border border-accent-200 focus:ring-primary-400 shadow-md hover:shadow-lg',
    white: 'bg-white hover:bg-accent-50 text-primary-800 focus:ring-primary-400 shadow-md hover:shadow-lg',
    'outline-white': 'border-2 border-white text-white hover:bg-white hover:text-primary-800 focus:ring-white',
    ghost: 'text-primary-700 hover:bg-accent-100 focus:ring-primary-400 hover:scale-105',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-lg hover:shadow-xl',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  }

  const classes = `${baseClass} ${variants[variant]} ${sizes[size]} ${className}`

  return (
    <button
      ref={ref}
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
