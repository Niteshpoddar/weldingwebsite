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
    ? 'block px-4 py-3 text-primary-700 hover:text-primary-900 hover:bg-luxury-pearl rounded-lg transition-colors duration-200'
    : 'px-4 py-2 text-primary-700 hover:text-primary-900 rounded-lg transition-colors duration-200 relative'

  const activeLinkClass = mobile
    ? 'bg-primary-50 text-primary-900 font-medium'
    : 'text-primary-900 font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-600 after:rounded-full'

  return (
    <nav className={mobile ? 'space-y-1' : 'flex items-center space-x-2'}>
      {navigationLinks.map((link) => {
        const isActive = pathname === link.href

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`${linkClass} ${isActive ? activeLinkClass : ''}`}
            onClick={mobile ? onClose : undefined}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
