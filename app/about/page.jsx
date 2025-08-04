export const metadata = {
  title: 'About Us - Our Story & Expertise',
  description: 'Learn about Bajrang Industries journey since 1984, our expertise in industrial roller manufacturing, and our commitment to quality engineering.',
}

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Mr. Gopalbhai Patel',
      role: 'Founder & Managing Director',
      description: 'Visionary leader with 35+ years in industrial roller manufacturing.',
      image: '👨‍💼'
    },
    {
      name: 'Engineering Team',
      role: 'Technical Specialists',
      description: 'Expert engineers specializing in roller design and precision machining.',
      image: '👨‍🔧'
    },
    {
      name: 'Quality Control',
      role: 'QC Department',
      description: 'Dedicated quality assurance ensuring every product meets specifications.',
      image: '🔍'
    },
    {
      name: 'Customer Support',
      role: 'Sales & Service',
      description: 'Experienced professionals providing technical support and consultation.',
      image: '👨‍💻'
    }
  ]

  const values = [
    {
      title: 'Quality',
      description: 'Commitment to precision and excellence in every product.',
      icon: '⭐'
    },
    {
      title: 'Innovation',
      description: 'Continuous improvement in manufacturing processes and product design.',
      icon: '💡'
    },
    {
      title: 'Reliability',
      description: 'Trusted partner for consistent supply and technical support.',
      icon: '🤝'
    },
    {
      title: 'Customer Focus',
      description: 'Understanding unique requirements and delivering custom solutions.',
      icon: '❤️'
    }
  ]

  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary-50 to-luxury-pearl">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-900 mb-8">
              About Bajrang Industries
            </h1>
            <p className="text-xl lg:text-2xl text-primary-600 leading-relaxed">
              Established in 1984, Bajrang Industries has been a trusted name in precision rubber roller 
              manufacturing and engineering solutions. Based in Ahmedabad, Gujarat, we serve customers 
              across India and globally with unwavering commitment to quality and service excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 lg:py-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-primary-900 mb-8">
                Our Mission
              </h2>
              <p className="text-lg text-primary-600 mb-6 leading-relaxed">
                To be the most reliable supplier and manufacturer of industrial rollers, setting benchmarks 
                in quality and innovation. We are committed to understanding our clients' unique requirements 
                and delivering precision-engineered solutions that exceed expectations.
              </p>
              <p className="text-lg text-primary-600 leading-relaxed">
                Through decades of experience in rubber roller manufacturing, we have built expertise across 
                diverse industries including printing, packaging, textile, steel, and paper processing, 
                ensuring optimal performance for every application.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-primary-700 mb-2">35+</div>
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
      <section className="py-20 lg:py-32 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-900 mb-6">
              Our Core Values
            </h2>
            <p className="text-lg lg:text-xl text-primary-600 max-w-3xl mx-auto">
              These principles guide our manufacturing processes and shape our commitment to engineering excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="card p-8 text-center group hover:shadow-lg transition-all duration-300">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-primary-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 lg:py-32">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-900 mb-6">
              Our Expert Team
            </h2>
            <p className="text-lg lg:text-xl text-primary-600 max-w-3xl mx-auto">
              Skilled professionals dedicated to delivering superior industrial roller solutions and exceptional customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="card p-8 text-center group hover:shadow-lg transition-all duration-300">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {member.image}
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-2">
                  {member.name}
                </h3>
                <div className="text-primary-600 font-medium mb-3">
                  {member.role}
                </div>
                <p className="text-primary-600 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
