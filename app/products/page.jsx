import { 
  SparklesIcon, 
  ShieldCheckIcon, 
  StarIcon, 
  CubeIcon, 
  ArrowPathIcon 
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import ProductHero from '../aboutProduct'

export const metadata = {
  title: 'E6013 Welding Electrodes - Premium Welding Solutions',
  description: 'High-quality E6013 welding electrodes offering consistent arc stability, low spatter, and excellent all-position performance for professional welding applications.',
}

export default function ProductsPage() {
  const features = [
    {
      icon: SparklesIcon,
      title: 'Consistent Arc Stability',
      description: 'Provides smooth, stable arc for precise welding control and professional results.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Low Spatter & Easy Slag Removal',
      description: 'Minimal spatter production and easy slag removal for clean, efficient welding.'
    },
    {
      icon: StarIcon,
      title: 'Smooth Finish & High Weld Strength',
      description: 'Delivers smooth weld finish with excellent mechanical properties and strength.'
    },
    {
      icon: CubeIcon,
      title: 'Premium Raw Materials',
      description: 'Manufactured using high-quality materials for consistent performance and reliability.'
    },
    {
      icon: ArrowPathIcon,
      title: 'All-Position Performance',
      description: 'Versatile electrodes that perform excellently in all welding positions.'
    }
  ]

  const specifications = [
    { label: 'Diameter', value: '2.5mm, 3.15mm, 4mm' },
    { label: 'Length', value: '350mm & 450mm' },
    { label: 'Current', value: 'AC/DC' },
    { label: 'AWS', value: 'A5.1 E6013' },
    { label: 'IS', value: '814' },
    { label: 'Coating', value: 'Rutile, All-position' }
  ]

  return (
    <div className="pt-20 lg:pt-24">
      {/* Breadcrumbs */}
      <div className="container-custom py-4">
        <nav className="flex items-center space-x-2 text-sm text-primary-600 animate-fade-in">
          <Link href="/" className="hover:text-primary-800 transition-colors duration-200">
            Home
          </Link>
          <span>/</span>
          <span className="text-primary-900 font-medium">Products</span>
        </nav>
      </div>

      {/* Hero Section
      <section className="py-20 lg:py-32 hero-gradient">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-900 mb-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
              E6013 Welding Electrodes
            </h1>
            <p className="text-xl lg:text-2xl text-primary-700 leading-relaxed mb-12 animate-slide-up" style={{ animationDelay: '400ms' }}>
              Premium quality welding electrodes designed for consistent arc stability, 
              low spatter production, and excellent all-position performance. 
              Perfect for professional welding applications requiring smooth finishes and high weld strength.
            </p>
            <Link href="/contact">
              <button className="btn-primary text-lg px-8 py-4 hover:scale-105 transition-all duration-300 animate-slide-up" style={{ animationDelay: '600ms' }}>
                Request Quote
              </button>
            </Link>
          </div>
        </div>
      </section> */}
      <ProductHero/>
      

      {/* Features Section */}
      <section className="py-20 lg:py-32 section-bg">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-900 mb-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
              Key Features
            </h2>
            <p className="text-xl text-primary-700 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '400ms' }}>
              Our E6013 electrodes are engineered for superior performance and reliability in demanding welding environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <div key={index} className="card p-8 text-center group hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-scale-in" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-luxury-cream to-amber-100 flex items-center justify-center group-hover:scale-110 group-hover:from-amber-100 group-hover:to-amber-200 transition-all duration-300 shadow-lg">
                  <feature.icon className="w-8 h-8 text-professional-navy-700" />
                </div>
                <h3 className="text-xl font-semibold text-primary-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-primary-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="py-20 lg:py-32 accent-bg">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-900 mb-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
              Technical Specifications
            </h2>
            <p className="text-xl text-primary-700 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '400ms' }}>
              Detailed specifications for E6013 welding electrodes to help you make informed decisions.
            </p>
          </div>

          <div className="max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '600ms' }}>
            <div className="card overflow-hidden">
              <div className="bg-primary-700 px-6 py-4">
                <h3 className="text-xl font-semibold text-white">
                  E6013 Welding Electrode Specifications
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {specifications.map((spec, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-primary-50 rounded-lg animate-slide-up" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                      <span className="font-medium text-primary-900 mb-2 sm:mb-0">
                        {spec.label}
                      </span>
                      <span className="text-primary-700 font-semibold">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-luxury-cream to-amber-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold text-professional-navy-800 mb-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
              Ready to Get Started?
            </h2>
            <p className="text-xl text-professional-navy-600 mb-12 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '400ms' }}>
              Get a custom quote for E6013 welding electrodes tailored to your specific requirements and volume needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '600ms' }}>
              <Link href="/contact">
                <button className="btn-primary text-lg px-8 py-4 hover:scale-105 transition-all duration-300">
                  Request Quote
                </button>
              </Link>
              <Link href="/contact">
                <button className="btn-secondary text-lg px-8 py-4 hover:scale-105 transition-all duration-300">
                  Contact Sales Team
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
