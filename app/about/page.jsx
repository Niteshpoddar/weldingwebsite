import { 
  UserIcon, 
  WrenchScrewdriverIcon, 
  MagnifyingGlassIcon, 
  ComputerDesktopIcon,
  StarIcon,
  LightBulbIcon,
  UserGroupIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import AboutHero from '../AboutHero'

export const metadata = {
  title: 'About Us - Our Story & Expertise',
  description: 'Learn about Bajrang Industries journey since 2004, our expertise in industrial roller manufacturing, and our commitment to quality engineering.',
}

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Mr. Gopalbhai Patel',
      role: 'Founder & Managing Director',
      description: 'Visionary leader with 21+ years in industrial roller manufacturing.',
      icon: UserIcon
    },
    {
      name: 'Engineering Team',
      role: 'Technical Specialists',
      description: 'Expert engineers specializing in roller design and precision machining.',
      icon: WrenchScrewdriverIcon
    },
    {
      name: 'Quality Control',
      role: 'QC Department',
      description: 'Dedicated quality assurance ensuring every product meets specifications.',
      icon: MagnifyingGlassIcon
    },
    {
      name: 'Customer Support',
      role: 'Sales & Service',
      description: 'Experienced professionals providing technical support and consultation.',
      icon: ComputerDesktopIcon
    }
  ]

  const values = [
    {
      title: 'Quality',
      description: 'Commitment to precision and excellence in every product.',
      icon: StarIcon
    },
    {
      title: 'Innovation',
      description: 'Continuous improvement in manufacturing processes and product design.',
      icon: LightBulbIcon
    },
    {
      title: 'Reliability',
      description: 'Trusted partner for consistent supply and technical support.',
      icon: UserGroupIcon
    },
    {
      title: 'Customer Focus',
      description: 'Understanding unique requirements and delivering custom solutions.',
      icon: HeartIcon
    }
  ]

  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero Section */}
      {/* <section className="py-20 lg:py-32 hero-gradient">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-900 mb-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
              About Bajrang Industries
            </h1>
            <p className="text-xl lg:text-2xl text-primary-700 leading-relaxed animate-slide-up" style={{ animationDelay: '400ms' }}>
              Established in 2004, Bajrang Industries has been a trusted name in precision rubber roller 
              manufacturing and engineering solutions. Based in Ahmedabad, Gujarat, we serve customers 
              across India and globally with unwavering commitment to quality and service excellence.
            </p>
          </div>
        </div>
      </section> */}
      <AboutHero/>

      {/* Our Mission */}
      <section className="py-20 lg:py-32 section-bg">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl lg:text-5xl font-bold text-primary-900 mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
                Our Mission
              </h2>
              <p className="text-lg text-primary-700 mb-6 leading-relaxed animate-slide-up" style={{ animationDelay: '200ms' }}>
                To be the most reliable supplier and manufacturer of industrial rollers, setting benchmarks 
                in quality and innovation. We are committed to understanding our clients' unique requirements 
                and delivering precision-engineered solutions that exceed expectations.
              </p>
              <p className="text-lg text-primary-700 leading-relaxed animate-slide-up" style={{ animationDelay: '300ms' }}>
                Through decades of experience in rubber roller manufacturing, we have built expertise across 
                diverse industries including structural fabrication, engineering & machinery, automobile & rail, 
                repair & maintenance, and general fabrication, ensuring optimal performance for every application.
              </p>
            </div>
            <div className="card p-8 lg:p-12 animate-slide-up" style={{ animationDelay: '400ms' }}>
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-primary-700 mb-2">21+</div>
                  <div className="text-primary-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-primary-700 mb-2">500+</div>
                  <div className="text-primary-600">Satisfied Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-primary-700 mb-2">5</div>
                  <div className="text-primary-600">Major Industries</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-primary-700 mb-2">100%</div>
                  <div className="text-primary-600">Custom Solutions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 lg:py-32 accent-bg">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-900 mb-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
              Our Core Values
            </h2>
            <p className="text-lg lg:text-xl text-primary-700 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
              These principles guide our manufacturing processes and shape our commitment to engineering excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={value.title} className="card p-8 text-center group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 transform hover:scale-105 animate-scale-in" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-100 to-yellow-100 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:from-red-200 group-hover:to-yellow-200 transition-all duration-300">
                  <value.icon className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-primary-700 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 lg:py-32 section-bg">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-900 mb-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
              Our Expert Team
            </h2>
            <p className="text-lg lg:text-xl text-primary-700 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
              Skilled professionals dedicated to delivering superior industrial roller solutions and exceptional customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={member.name} className="card p-8 text-center group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 transform hover:scale-105 animate-slide-up" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-100 to-yellow-100 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:from-red-200 group-hover:to-yellow-200 transition-all duration-300">
                  <member.icon className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-2">
                  {member.name}
                </h3>
                <div className="text-primary-600 font-medium mb-3">
                  {member.role}
                </div>
                <p className="text-primary-700 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
              Ready to Get Started?
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Let our experienced team provide precision-engineered solutions for your specific industrial requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="/products" className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Explore Products
              </a>
              <a href="/contact" className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium rounded-lg transition-colors duration-200">
                Get Quote
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
