import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/products', label: 'Products' },
    { href: '/industries', label: 'Industries' },
    { href: '/careers', label: 'Careers' },
    { href: '/login', label: 'Login' },
  ]

  const services = [
    { href: '/training', label: 'Training' },
    { href: '/contact', label: 'Contact' },
    { href: '/job-form', label: 'Apply Now' },
  ]

  return (
    <footer className="bg-gradient-to-br from-professional-navy-800 to-professional-navy-900 text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 animate-fade-in">
            <div className="flex items-center space-x-3 mb-6 group">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl relative overflow-hidden">
                <Image
                  src="/abcdef.png"
                  alt="Bajrang Industries Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-bold group-hover:text-professional-navy-300 transition-colors duration-300">Bajrang Industries</span>
            </div>
            <p className="text-professional-navy-200 mb-6 max-w-md leading-relaxed">
              Discover excellence through our curated collection of premium industrial roller solutions and engineering services. 
              Where innovation meets sophistication, delivering solutions that elevate your manufacturing processes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-professional-navy-300 hover:text-professional-navy-100 transition-all duration-300 hover:scale-110" aria-label="LinkedIn">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="text-professional-navy-300 hover:text-professional-navy-100 transition-all duration-300 hover:scale-110" aria-label="Twitter">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="text-professional-navy-300 hover:text-professional-navy-100 transition-all duration-300 hover:scale-110" aria-label="Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.321-1.495C4.198 14.553 3.817 13.269 3.817 11.987c0-1.297.49-2.448 1.495-3.321.935-.94 2.219-1.321 3.501-1.321 1.297 0 2.448.49 3.321 1.495.875.94 1.321 2.224 1.321 3.506 0 1.297-.49 2.448-1.495 3.321-.935.94-2.219 1.321-3.501 1.321z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
            <h3 className="text-lg font-semibold mb-6 text-professional-navy-100">Quick Links</h3>
            <nav className="space-y-3">
              {quickLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-professional-navy-300 hover:text-professional-navy-100 transition-all duration-300 hover:translate-x-1"
                  style={{ animationDelay: `${300 + index * 50}ms` }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="animate-slide-up" style={{ animationDelay: '400ms' }}>
            <h3 className="text-lg font-semibold mb-6 text-professional-navy-100">Services</h3>
            <nav className="space-y-3">
              {services.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-professional-navy-300 hover:text-professional-navy-100 transition-all duration-300 hover:translate-x-1"
                  style={{ animationDelay: `${500 + index * 50}ms` }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-professional-navy-700 animate-fade-in" style={{ animationDelay: '600ms' }}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-professional-navy-400 text-sm">
              © {currentYear} Bajrang Industries. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="#" className="text-professional-navy-400 hover:text-professional-navy-200 transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="#" className="text-primary-400 hover:text-primary-200 transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="#" className="text-primary-400 hover:text-primary-200 transition-colors duration-300">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
