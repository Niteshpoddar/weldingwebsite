import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata = {
  metadataBase: new URL('http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/abcdef.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: '/abcdef.png',
  },
  openGraph: {
    default: 'Bajrang Industries - Premium Industrial Solutions',
    template: '%s | Bajrang Industries',
    type: 'website',
    description: 'Discover premium industrial roller solutions and engineering services with Bajrang Industries. Excellence, innovation, and quality in every solution.',
    keywords: 'industrial rollers, rubber rollers, manufacturing, engineering, premium, solutions, quality, innovation',
    authors: [{ name: 'Bajrang Industries Team' }],
    creator: 'Bajrang Industries',
    publisher: 'Bajrang Industries',
    siteName: 'Bajrang Industries',
    images: [
      {
        url: '/abcdef.png',
        width: 128,
        height: 128,
        alt: 'Bajrang Industries Logo'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bajrang Industries - Premium Industrial Solutions',
    description: 'Discover premium industrial roller solutions and engineering services with Bajrang Industries.',
    siteName: 'Bajrang Industries',
    images: ['/abcdef.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <div className="min-h-screen flex flex-col bg-luxury-cream">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
