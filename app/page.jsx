import Link from 'next/link'
import Button from '../components/Button'
import IndustryCard from '../components/IndustryCard'
import LandingPage from './Test'

export const metadata = {
  title: 'Bajrang Industries - Premium Industrial Rollers & Engineering Solutions',
  description: 'Leading manufacturer of specialized rubber rollers and engineering products since 2004. Serving structural fabrication, engineering & machinery, automobile & rail, repair & maintenance, and general fabrication industries.',
}

export default function HomePage() {
  const industries = [
    {
      name: 'Structural Fabrication',
      description: 'Steel rollers, structural support, and construction solutions',
      count: '25+ Solutions'
    },
    {
      name: 'Engineering & Machinery',
      description: 'Precision rollers and custom engineering solutions',
      count: '20+ Solutions'
    },
    {
      name: 'Automobile & Rail',
      description: 'High-performance automotive and railway rollers',
      count: '18+ Solutions'
    },
    {
      name: 'General Fabrication',
      description: 'Versatile rollers for manufacturing processes',
      count: '22+ Solutions'
    }
  ]

  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero Section */}
      {/* <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-primary-900 mb-8 leading-tight animate-slide-up">
              Bajrang
              <span className="block text-gradient">Industries</span>
              <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light animate-slide-up" style={{ animationDelay: '200ms' }}>
                Since 2004
              </span>
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-primary-700 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '400ms' }}>
              Leading manufacturer and supplier of specialized rubber rollers and precision engineering products. 
              Trusted by industries across India and globally.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up" style={{ animationDelay: '600ms' }}>
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
      </section> */}
      <LandingPage/>

      {/* Industries Section */}
      <section className="py-20 lg:py-32 section-bg">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-900 mb-6">
              Industries We Serve
            </h2>
            <p className="text-lg lg:text-xl text-primary-700 max-w-3xl mx-auto">
              Over 21+ years of expertise in manufacturing precision rubber rollers and engineering components for diverse industrial applications.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry, index) => (
              <div key={industry.name} className="animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
                <IndustryCard industry={industry} />
              </div>
            ))}
          </div>

          <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '600ms' }}>
            <Link href="/industries">
              <Button variant="secondary" size="lg">
                Explore All Industries
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 text-gray-900">
              Need Custom Industrial Rollers?
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Let our experienced team provide precision-engineered solutions for your specific industrial requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <Button variant="white" size="xl" className="w-full sm:w-auto">
                  Get Custom Quote
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="white" size="xl" className="w-full sm:w-auto">
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
