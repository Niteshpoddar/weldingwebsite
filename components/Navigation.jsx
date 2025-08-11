'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/industries', label: 'Industries' },
  { href: '/training', label: 'Training' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
]

export default function Navigation({ mobile = false, onClose }) {
  const pathname = usePathname()

  const linkClass = mobile
    ? 'block px-4 py-3 text-primary-700 hover:text-primary-900 hover:bg-accent-100 rounded-lg transition-all duration-300 hover:scale-105'
    : 'px-4 py-2 text-primary-700 hover:text-primary-900 rounded-lg transition-all duration-300 relative group'

  const activeLinkClass = mobile
    ? 'bg-accent-100 text-primary-900 font-medium'
    : 'text-primary-900 font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-500 after:rounded-full after:animate-scale-in'

  return (
    <nav className={mobile ? 'space-y-1' : 'flex items-center space-x-2'}>
      {navigationLinks.map((link, index) => {
        const isActive = pathname === link.href

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`${linkClass} ${isActive ? activeLinkClass : ''} animate-fade-in`}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={mobile ? onClose : undefined}
          >
            {link.label}
            {!mobile && !isActive && (
              <span className="absolute inset-0 bg-accent-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
            )}
          </Link>
        )
      })}
    </nav>
  )
}
