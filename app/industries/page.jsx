export const metadata = {
  title: 'Industries - Specialized Solutions by Sector',
  description: 'Industry-specific roller solutions for printing, packaging, textile, steel, paper mills, and other demanding industrial applications.',
}

export default function IndustriesPage() {
  const industries = [
    {
      name: 'Printing & Packaging',
      description: 'Comprehensive roller solutions for printing and packaging industries with precision requirements.',
      icon: '🖨️',
      count: '25+ Solutions',
      solutions: ['Flexo Printing Rollers', 'Gravure Rollers', 'Offset Press Rollers', 'Lamination Rollers'],
      challenges: ['Print quality consistency', 'High-speed operations', 'Ink transfer precision', 'Durability requirements']
    },
    {
      name: 'Textile Industry',
      description: 'Specialized rollers for textile processing, dyeing, and finishing applications.',
      icon: '🧵',
      count: '20+ Solutions', 
      solutions: ['Dyeing Rollers', 'Embossing Rollers', 'Calendering Rollers', 'Guide Rollers'],
      challenges: ['Chemical resistance', 'Temperature stability', 'Surface finish quality', 'Consistent pressure']
    },
    {
      name: 'Steel & Metal Processing',
      description: 'Heavy-duty rollers for steel mills and metal processing lines with extreme durability.',
      icon: '🏭',
      count: '15+ Solutions',
      solutions: ['PU Rollers for Coil Lines', 'Backup Rollers', 'Tension Rollers', 'Guide Systems'],
      challenges: ['High load capacity', 'Abrasion resistance', 'Temperature extremes', 'Dimensional stability']
    },
    {
      name: 'Paper Mills',
      description: 'Complete roller systems for paper manufacturing processes from pulp to finished product.',
      icon: '📄',
      count: '18+ Solutions',
      solutions: ['Sizing Rollers', 'Calendar Rollers', 'Press Rollers', 'Doctor Blade Systems'],
      challenges: ['Moisture resistance', 'Pressure uniformity', 'Surface smoothness', 'Long service life']
    },
    {
      name: 'Plastic Film',
      description: 'Precision rollers for plastic film manufacturing and converting operations.',
      icon: '🎞️',
      count: '12+ Solutions',
      solutions: ['Corona Treater Rollers', 'Nip Rollers', 'Banana Rollers', 'Cooling Rollers'],
      challenges: ['Static control', 'Heat dissipation', 'Surface quality', 'Film handling']
    },
    {
      name: 'Cement & Conveyor',
      description: 'Robust conveyor and guide rollers for cement plants and heavy material handling.',
      icon: '🏗️',
      count: '10+ Solutions',
      solutions: ['Conveyor Rollers', 'Guide Rollers', 'Idler Rollers', 'Return Rollers'],
      challenges: ['Dust resistance', 'Heavy load capacity', 'Maintenance intervals', 'Environmental conditions']
    }
  ]

  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary-50 to-luxury-pearl">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-900 mb-8">
              Industries We Serve
            </h1>
            <p className="text-xl lg:text-2xl text-primary-600 leading-relaxed">
              Specialized roller solutions tailored to meet the demanding requirements and 
              unique challenges of diverse industrial sectors across India and globally.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 lg:py-32">
        <div className="container-custom">
          <div className="space-y-16 lg:space-y-24">
            {industries.map((industry, index) => (
              <div 
                key={industry.name}
                id={industry.name.toLowerCase().replace(/\s+/g, '-')}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center mb-6">
                    <div className="text-6xl mr-4">{industry.icon}</div>
                    <div>
                      <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-2">
                        {industry.name}
                      </h2>
                      <span className="text-primary-600 font-medium">
                        {industry.count}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-lg text-primary-600 mb-8 leading-relaxed">
                    {industry.description}
                  </p>

                  <div className="mb-8">
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

                <div className={`card p-8 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h3 className="text-xl font-semibold text-primary-900 mb-6">
                    Our Solutions
                  </h3>
                  <div className="space-y-4">
                    {industry.solutions.map((solution, i) => (
                      <div key={i} className="flex items-center p-4 bg-luxury-pearl rounded-lg">
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
      <section className="py-20 lg:py-32 bg-primary-900 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8">
              Need Industry-Specific Solutions?
            </h2>
            <p className="text-xl lg:text-2xl text-primary-200 mb-12 max-w-2xl mx-auto">
              Our engineering team can develop customized roller solutions tailored specifically to your industry's unique requirements and operational challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="/contact" className="btn-primary">
                Discuss Your Requirements
              </a>
              <a href="/products" className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white hover:bg-white hover:text-primary-700 font-medium rounded-lg transition-colors duration-200">
                View All Solutions
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
