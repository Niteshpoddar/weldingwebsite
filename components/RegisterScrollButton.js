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
      className={`${className} btn-secondary w-full group-hover:bg-accent-100 group-hover:border-accent-300 transition-all duration-300 hover:scale-105`}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
