import { 
  PrinterIcon, 
  SwatchIcon, 
  BuildingOffice2Icon, 
  DocumentTextIcon, 
  FilmIcon, 
  BuildingOfficeIcon,
  WrenchScrewdriverIcon,
  TruckIcon
} from '@heroicons/react/24/outline'

export const metadata = {
  title: 'Industries - Specialized Solutions by Sector',
  description: 'Industry-specific roller solutions for structural fabrication, engineering & machinery, automobile & rail, repair & maintenance, and general fabrication.',
}

export default function IndustriesPage() {
  const industries = [
    {
      name: 'Structural Fabrication',
      description: 'Comprehensive roller solutions for structural steel fabrication and construction industries.',
      icon: BuildingOffice2Icon,
      count: '25+ Solutions',
      solutions: ['Steel Rollers', 'Structural Support Rollers', 'Construction Rollers', 'Heavy-Duty Rollers'],
      challenges: ['High load capacity', 'Durability requirements', 'Precision alignment', 'Weather resistance']
    },
    {
      name: 'Engineering & Machinery',
      description: 'Specialized rollers for engineering applications and machinery manufacturing.',
      icon: WrenchScrewdriverIcon,
      count: '20+ Solutions', 
      solutions: ['Precision Rollers', 'Machinery Rollers', 'Engineering Rollers', 'Custom Rollers'],
      challenges: ['Precision requirements', 'Custom specifications', 'Quality standards', 'Performance reliability']
    },
    {
      name: 'Automobile & Rail',
      description: 'High-performance rollers for automotive and railway manufacturing applications.',
      icon: TruckIcon,
      count: '18+ Solutions',
      solutions: ['Automotive Rollers', 'Railway Rollers', 'Transport Rollers', 'Precision Rollers'],
      challenges: ['Safety standards', 'High-speed operations', 'Precision requirements', 'Durability needs']
    },
    {
      name: 'Repair & Maintenance',
      description: 'Reliable rollers for repair workshops and maintenance operations.',
      icon: WrenchScrewdriverIcon,
      count: '15+ Solutions',
      solutions: ['Maintenance Rollers', 'Repair Rollers', 'Service Rollers', 'Replacement Rollers'],
      challenges: ['Quick availability', 'Quality assurance', 'Cost-effectiveness', 'Service support']
    },
    {
      name: 'General Fabrication',
      description: 'Versatile roller solutions for general fabrication and manufacturing processes.',
      icon: BuildingOfficeIcon,
      count: '22+ Solutions',
      solutions: ['General Purpose Rollers', 'Fabrication Rollers', 'Manufacturing Rollers', 'Universal Rollers'],
      challenges: ['Versatility requirements', 'Cost optimization', 'Quality consistency', 'Delivery reliability']
    }
  ]

  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 hero-gradient">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-900 mb-8 hero-title">
              Industries We Serve
            </h1>
            <p className="text-xl lg:text-2xl text-primary-700 leading-relaxed hero-subtitle">
              Specialized roller solutions tailored to meet the demanding requirements and 
              unique challenges of structural fabrication, engineering, automotive, and general manufacturing sectors.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 lg:py-32 section-bg">
        <div className="container-custom">
          <div className="space-y-16 lg:space-y-24">
            {industries.map((industry, index) => (
              <div 
                key={industry.name}
                id={industry.name.toLowerCase().replace(/\s+/g, '-')}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                } animate-fade-in`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center mb-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
                    <div className="w-16 h-16 mr-4 bg-gradient-to-br from-red-100 to-yellow-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <industry.icon className="w-8 h-8 text-red-600" />
                    </div>
                    <div>
                      <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-2">
                        {industry.name}
                      </h2>
                      <span className="text-primary-600 font-medium">
                        {industry.count}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-lg text-primary-700 mb-8 leading-relaxed animate-slide-up" style={{ animationDelay: '200ms' }}>
                    {industry.description}
                  </p>

                  <div className="mb-8 animate-slide-up" style={{ animationDelay: '300ms' }}>
                    <h3 className="text-xl font-semibold text-primary-900 mb-4">
                      Key Challenges We Address:
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {industry.challenges.map((challenge, i) => (
                        <li key={i} className="flex items-start text-primary-600">
                          <span className="text-primary-400 mr-2">•</span>
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className={`card p-8 ${index % 2 === 1 ? 'lg:order-1' : ''} animate-slide-up`} style={{ animationDelay: '400ms' }}>
                  <h3 className="text-xl font-semibold text-primary-900 mb-6">
                    Our Solutions
                  </h3>
                  <div className="space-y-4">
                    {industry.solutions.map((solution, i) => (
                      <div key={i} className="flex items-center p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors duration-300">
                        <div className="w-3 h-3 bg-primary-600 rounded-full mr-4 flex-shrink-0"></div>
                        <span className="text-primary-700 font-medium">{solution}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
              Need Industry-Specific Solutions?
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '400ms' }}>
              Our engineering team can develop customized roller solutions tailored specifically to your industry's unique requirements and operational challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up" style={{ animationDelay: '600ms' }}>
              <a href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Discuss Your Requirements
              </a>
              <a href="/products" className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium rounded-lg transition-colors duration-200">
                View All Solutions
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
