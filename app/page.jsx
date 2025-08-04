import Link from 'next/link'
import Button from '../components/Button'
import ProductCard from '../components/ProductCard'
import IndustryCard from '../components/IndustryCard'

export const metadata = {
  title: 'Bajrang Industries - Premium Industrial Rollers & Engineering Solutions',
  description: 'Leading manufacturer of specialized rubber rollers and engineering products since 1984. Serving printing, packaging, textile, steel, and paper industries.',
}

export default function HomePage() {
  const featuredProducts = [
    {
      id: 1,
      name: 'Industrial Rubber Rollers',
      category: 'Printing',
      price: 'Custom Quote',
      description: 'High-performance rubber rollers for Flexo, Gravure, and Offset printing applications.',
      features: ['Flexo Printing', 'Gravure', 'Offset', 'Lamination']
    },
    {
      id: 2,
      name: 'PU and Ebonite Rollers',
      category: 'Industrial',
      price: 'Custom Quote',
      description: 'Precision rollers designed for steel, paper, and textile industry applications.',
      features: ['Steel Industry', 'Paper Mills', 'Textile', 'Durability']
    },
    {
      id: 3,
      name: 'Hard Chrome Rollers',
      category: 'Engineering',
      price: 'Custom Quote',
      description: 'Chrome plated rollers for superior corrosion resistance and extended service life.',
      features: ['Corrosion Resistant', 'High Durability', 'Precision', 'Custom Specs']
    }
  ]

  const industries = [
    {
      name: 'Printing & Packaging',
      description: 'Flexo, Gravure, Offset presses, and Lamination solutions',
      icon: '🖨️',
      count: '25+ Solutions'
    },
    {
      name: 'Textile Industry',
      description: 'Dyeing, Embossing, Calendering roller solutions',
      icon: '🧵',
      count: '20+ Solutions'
    },
    {
      name: 'Steel & Metal',
      description: 'PU and rubber rollers for coil processing lines',
      icon: '🏭',
      count: '15+ Solutions'
    },
    {
      name: 'Paper Mills',
      description: 'Sizing, calendar, press, and guide roller systems',
      icon: '📄',
      count: '18+ Solutions'
    }
  ]

  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-luxury-cream to-luxury-pearl"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-primary-900 mb-8 leading-tight">
              Bajrang
              <span className="block text-gradient">Industries</span>
              <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light">
                Since 1984
              </span>
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-primary-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Leading manufacturer and supplier of specialized rubber rollers and precision engineering products. 
              Trusted by industries across India and globally.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/products">
                <Button size="xl" className="w-full sm:w-auto">
                  Our Products
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="secondary" size="xl" className="w-full sm:w-auto">
                  Get Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 lg:py-32">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-900 mb-6">
              Our Specializations
            </h2>
            <p className="text-lg lg:text-xl text-primary-600 max-w-3xl mx-auto">
              Over 35 years of expertise in manufacturing precision rubber rollers and engineering components for diverse industrial applications.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/products">
              <Button variant="secondary" size="lg">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-900 mb-6">
              Industries We Serve
            </h2>
            <p className="text-lg lg:text-xl text-primary-600 max-w-3xl mx-auto">
              Specialized roller solutions tailored to meet the demanding requirements of various industrial sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry) => (
              <IndustryCard key={industry.name} industry={industry} />
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/industries">
              <Button variant="secondary" size="lg">
                Explore All Industries
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-primary-900 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-8">
              Need Custom Industrial Rollers?
            </h2>
            <p className="text-xl lg:text-2xl text-primary-200 mb-12 max-w-2xl mx-auto">
              Let our experienced team provide precision-engineered solutions for your specific industrial requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <Button variant="white" size="xl" className="w-full sm:w-auto">
                  Get Custom Quote
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline-white" size="xl" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
