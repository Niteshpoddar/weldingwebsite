import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata = {
  title: {
    default: 'Catalogue Website - Premium Solutions',
    template: '%s | Catalogue Website'
  },
  description: 'Discover premium products and services with our comprehensive catalogue. Excellence, innovation, and quality in every solution.',
  keywords: 'catalogue, products, services, premium, solutions, quality, innovation',
  authors: [{ name: 'Catalogue Website Team' }],
  creator: 'Catalogue Website',
  publisher: 'Catalogue Website',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourwebsite.com',
    title: 'Catalogue Website - Premium Solutions',
    description: 'Discover premium products and services with our comprehensive catalogue.',
    siteName: 'Catalogue Website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Catalogue Website - Premium Solutions',
    description: 'Discover premium products and services with our comprehensive catalogue.',
    creator: '@yourhandle',
  },
  robots: {
    index: true,
    follow: true,
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
