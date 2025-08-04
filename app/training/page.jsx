import RegisterScrollButton from '../../components/RegisterScrollButton'
import Link from 'next/link'
export const metadata = {
  title: 'Training & Support - Technical Services',
  description: 'On-site training, installation support, and maintenance services for industrial roller systems and equipment.',
}

export default function TrainingPage() {
  const services = [
    {
      id: 1,
      name: 'Installation & Commissioning',
      duration: 'On-site',
      level: 'Technical',
      description: 'Professional installation supervision and alignment of supplied roller systems.',
      topics: ['Roller Installation', 'Alignment Procedures', 'System Integration', 'Performance Testing']
    },
    {
      id: 2,
      name: 'Maintenance Training',
      duration: '1-2 days',
      level: 'Operator',
      description: 'Basic preventive maintenance training for plant operators and maintenance teams.',
      topics: ['Routine Maintenance', 'Troubleshooting', 'Safety Procedures', 'Performance Monitoring']
    },
    {
      id: 3,
      name: 'Technical Consultation',
      duration: 'As needed',
      level: 'Engineering',
      description: 'Expert consultation on roller selection, application optimization, and performance improvement.',
      topics: ['Application Analysis', 'Material Selection', 'Performance Optimization', 'Cost Reduction']
    },
    {
      id: 4,
      name: 'Repair & Refurbishing',
      duration: 'Service',
      level: 'Professional',
      description: 'Complete repair solutions and refurbishing services for worn or damaged rollers.',
      topics: ['Damage Assessment', 'Repair Procedures', 'Re-coating Services', 'Quality Assurance']
    }
  ]

  const serviceTypes = [
    {
      type: 'On-site Services',
      icon: '🏭',
      description: 'Technical services delivered at your facility',
      benefits: ['No production interruption', 'Customized solutions', 'Immediate support', 'Cost-effective']
    },
    {
      type: 'Remote Support',
      icon: '💻',
      description: 'Technical consultation via phone and video',
      benefits: ['Quick response', 'Cost-effective', 'Expert guidance', 'Documentation support']
    },
    {
      type: 'Workshop Services',
      icon: '🔧',
      description: 'Comprehensive repair and refurbishing at our facility',
      benefits: ['Advanced equipment', 'Quality control', 'Faster turnaround', 'Performance testing']
    }
  ]

  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary-50 to-luxury-pearl">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-900 mb-8">
              Training & Support
            </h1>
            <p className="text-xl lg:text-2xl text-primary-600 mb-12 leading-relaxed">
              Comprehensive technical support services including on-site training, installation supervision, 
              and maintenance consultation for optimal roller performance and extended service life.
            </p>
            <a href="#services" className="btn-primary text-lg px-8 py-4">
              Our Services
            </a>
          </div>
        </div>
      </section>

      {/* Service Types */}
      <section className="py-20 lg:py-32">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-900 mb-6">
              Service Options
            </h2>
            <p className="text-lg lg:text-xl text-primary-600 max-w-3xl mx-auto">
              Choose the service format that best fits your operational requirements and schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceTypes.map((service) => (
              <div key={service.type} className="card p-8 text-center group hover:shadow-lg transition-all duration-300">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-4">
                  {service.type}
                </h3>
                <p className="text-primary-600 mb-6 leading-relaxed">
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
      <section id="services" className="py-20 lg:py-32 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-900 mb-6">
              Available Services
            </h2>
            <p className="text-lg lg:text-xl text-primary-600 max-w-3xl mx-auto">
              Comprehensive support services designed by our technical experts to maximize your roller system performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div key={service.id} className="card p-8 h-full flex flex-col group hover:shadow-lg transition-all duration-300">
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

                  <p className="text-primary-600 mb-6 leading-relaxed">
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
      <section id="contact" className="py-20 lg:py-32">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-900 mb-6">
              Schedule Technical Support
            </h2>
            <p className="text-lg text-primary-600 mb-8">
              To book an engineer visit, arrange maintenance training, or discuss your technical requirements, 
              contact our support team for prompt assistance.
            </p>
            <div className="space-y-4">
              <p className="text-primary-700">
                <strong>Technical Support:</strong> +91-98250 00000
              </p>
              <p className="text-primary-700">
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
