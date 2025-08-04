'use client'

export default function RegisterScrollButton({ children, className = '' }) {
  // Handles click and scrolls to the register section
  const handleClick = () => {
    const section = document.getElementById('register')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <button
      type="button"
      className={`${className} btn-secondary w-full group-hover:bg-primary-50`}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
