'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navigation from './Navigation'
import Button from './Button'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white shadow-lg border-b border-gray-200' 
        : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between py-4 lg:py-6">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl relative overflow-hidden">
              <Image
                src="/abcdef.png"
                alt="Bajrang Industries Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl font-bold text-primary-900 hidden sm:block group-hover:text-primary-700 transition-colors duration-300">
              Bajrang Industries
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block animate-fade-in">
            <Navigation />
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4 animate-slide-in">
            <Link href="/contact">
              <Button variant="secondary" size="sm">
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-primary-600 hover:text-primary-800 transition-all duration-300 hover:scale-110"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 bg-white rounded-b-lg animate-slide-down shadow-lg">
            <Navigation mobile onClose={() => setIsMobileMenuOpen(false)} />
            <div className="mt-4 px-4">
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="secondary" className="w-full">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
