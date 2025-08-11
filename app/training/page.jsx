import Link from 'next/link';
import RegisterScrollButton from '../../components/RegisterScrollButton';
import { connectToDatabase } from '../dbconfig/dbconfig';
import Training from '../models/trainingmodels'; // Your Mongoose model for training services
import { 
  BuildingOffice2Icon, 
  ComputerDesktopIcon, 
  WrenchScrewdriverIcon 
} from '@heroicons/react/24/outline'

export const metadata = {
  title: 'Training & Support - Technical Services',
  description: 'On-site training, installation support, and maintenance services for industrial roller systems and equipment.',
};

export default async function TrainingPage() {
  await connectToDatabase();

  // Fetch services dynamically from MongoDB
  const servicesFromDb = await Training.find().lean();

  // Map the data to plain objects if needed (convert _id to string etc.)
  const services = servicesFromDb.map(service => ({
    id: service._id.toString(),
    name: service.name,
    duration: service.duration,
    level: service.level,
    description: service.description,
    topics: service.topics,
  }));

  const serviceTypes = [
    {
      type: 'On-site Services',
      icon: BuildingOffice2Icon,
      description: 'Technical services delivered at your facility',
      benefits: ['No production interruption', 'Customized solutions', 'Immediate support', 'Cost-effective']
    },
    {
      type: 'Remote Support',
      icon: ComputerDesktopIcon,
      description: 'Technical consultation via phone and video',
      benefits: ['Quick response', 'Cost-effective', 'Expert guidance', 'Documentation support']
    },
    {
      type: 'Workshop Services',
      icon: WrenchScrewdriverIcon,
      description: 'Comprehensive repair and refurbishing at our facility',
      benefits: ['Advanced equipment', 'Quality control', 'Faster turnaround', 'Performance testing']
    }
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
          <span className="text-primary-900 font-medium">Training & Support</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 hero-gradient">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-900 mb-8 hero-title">
              Training & Support
            </h1>
            <p className="text-xl lg:text-2xl text-primary-700 mb-12 leading-relaxed hero-subtitle">
              Comprehensive technical support services including on-site training, installation supervision, 
              and maintenance consultation for optimal roller performance and extended service life.
            </p>
            <a href="#services" className="btn-primary text-lg px-8 py-4 hero-cta">
              Our Services
            </a>
          </div>
        </div>
      </section>

      {/* Service Types */}
      <section className="py-20 lg:py-32 section-bg">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-900 mb-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
              Service Options
            </h2>
            <p className="text-lg lg:text-xl text-primary-700 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
              Choose the service format that best fits your operational requirements and schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceTypes.map((service, index) => (
              <div key={service.type} className="card p-8 text-center group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 transform hover:scale-105 animate-scale-in" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:from-amber-100 group-hover:to-amber-200 transition-all duration-300 shadow-lg">
                  <service.icon className="w-8 h-8 text-red-700" />
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-4">
                  {service.type}
                </h3>
                <p className="text-red-700 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start text-sm text-primary-600">
                      <span className="text-primary-400 mr-2">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Services */}
      <section id="services" className="py-20 lg:py-32 accent-bg">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-900 mb-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
              Available Services
            </h2>
            <p className="text-lg lg:text-xl text-primary-700 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
              Comprehensive support services designed by our technical experts to maximize your roller system performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={service.id} className="card p-8 h-full flex flex-col group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 transform hover:scale-105 animate-slide-up" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      service.level === 'Operator' ? 'bg-green-100 text-green-700' :
                      service.level === 'Technical' ? 'bg-blue-100 text-blue-700' :
                      service.level === 'Engineering' ? 'bg-purple-100 text-purple-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {service.level}
                    </span>
                    <span className="text-sm font-semibold text-primary-600">
                      {service.duration}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-primary-900 mb-3 group-hover:text-primary-700 transition-colors">
                    {service.name}
                  </h3>

                  <p className="text-primary-700 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-primary-900 mb-3">Key Areas:</h4>
                    <ul className="space-y-1">
                      {service.topics.map((topic, i) => (
                        <li key={i} className="flex items-start text-sm text-primary-600">
                          <span className="text-primary-400 mr-2">•</span>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                 <Link href = {`/training-form?courseName=${encodeURIComponent(service.name)}`}>
                  <RegisterScrollButton>
                    Register Now
                  </RegisterScrollButton>
                 </Link> 
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 lg:py-32 bg-gradient-to-br from-amber-50 to-amber-100">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold text-red-800 mb-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
              Schedule Technical Support
            </h2>
            <p className="text-lg text-red-700 mb-8 animate-slide-up" style={{ animationDelay: '400ms' }}>
              To book an engineer visit, arrange maintenance training, or discuss your technical requirements, 
              contact our support team for prompt assistance.
            </p>
            <div className="space-y-4 animate-slide-up" style={{ animationDelay: '600ms' }}>
              <p className="text-red-700">
                <strong>Technical Support:</strong> +91-98250 00000
              </p>
              <p className="text-red-700">
                <strong>Email:</strong> support@bajrangindustries.com
              </p>
              <div className="mt-8">
                <a href="/contact" className="btn-primary text-lg px-8 py-4">
                  Contact Support Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
