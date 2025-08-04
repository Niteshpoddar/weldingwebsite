import ProductCard from '../../components/ProductCard'

export const metadata = {
  title: 'Products - Industrial Rollers & Engineering Solutions',
  description: 'Comprehensive range of industrial rubber rollers, PU rollers, chrome rollers, and precision engineering components for diverse applications.',
}

export default function ProductsPage() {
  const products = [
    {
      id: 1,
      name: 'Industrial Rubber Rollers',
      category: 'Printing',
      price: 'Custom Quote',
      description: 'High-performance rubber rollers for Flexo, Gravure, and Offset printing applications with precision tolerances.',
      features: ['Flexo Printing', 'Gravure', 'Offset', 'Lamination']
    },
    {
      id: 2,
      name: 'PU and Ebonite Rollers',
      category: 'Industrial',
      price: 'Custom Quote', 
      description: 'Durable polyurethane and ebonite rollers designed for steel, paper, and textile industry applications.',
      features: ['Steel Industry', 'Paper Mills', 'Textile', 'High Durability']
    },
    {
      id: 3,
      name: 'Hard Chrome Rollers',
      category: 'Engineering',
      price: 'Custom Quote',
      description: 'Chrome plated rollers offering superior corrosion resistance and extended service life for demanding applications.',
      features: ['Corrosion Resistant', 'High Durability', 'Precision Finish', 'Custom Specs']
    },
    {
      id: 4,
      name: 'Aluminium Anilox Rollers',
      category: 'Printing',
      price: 'Custom Quote',
      description: 'Precision anilox rollers for consistent ink transfer in flexographic and gravure printing processes.',
      features: ['Ink Transfer', 'Precision', 'Flexo & Gravure', 'Custom Engraving']
    },
    {
      id: 5,
      name: 'Industrial Shafts',
      category: 'Engineering',
      price: 'Custom Quote',
      description: 'Custom fabricated shafts in MS, SS, and Aluminum for OEMs and end-users across various industries.',
      features: ['MS/SS/Aluminum', 'Custom Design', 'OEM Supply', 'Precision Machining']
    },
    {
      id: 6,
      name: 'Rubber Covering Services',
      category: 'Services',
      price: 'Custom Quote',
      description: 'Complete rubber covering and re-coating services for refurbishing old rollers to like-new performance.',
      features: ['Refurbishing', 'Re-coating', 'Rubber Covering', 'Performance Restoration']
    },
    {
      id: 7,
      name: 'Conveyor Rollers',
      category: 'Industrial',
      price: 'Custom Quote',
      description: 'Heavy-duty conveyor rollers and guide rollers for cement, mining, and material handling applications.',
      features: ['Heavy Duty', 'Conveyor Systems', 'Guide Rollers', 'Industrial Grade']
    },
    {
      id: 8,
      name: 'Textile Rollers',
      category: 'Textile',
      price: 'Custom Quote',
      description: 'Specialized rollers for dyeing, embossing, and calendering processes in the textile industry.',
      features: ['Dyeing Process', 'Embossing', 'Calendering', 'Textile Grade']
    },
    {
      id: 9,
      name: 'Paper Mill Rollers',
      category: 'Paper',
      price: 'Custom Quote',
      description: 'Comprehensive range of sizing, calendar, press, and guide rollers for paper manufacturing processes.',
      features: ['Sizing Rollers', 'Calendar Rollers', 'Press Rollers', 'Guide Systems']
    }
  ]

  const categories = [
    'All Products',
    'Printing',
    'Industrial', 
    'Engineering',
    'Textile',
    'Paper',
    'Services'
  ]

  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary-50 to-luxury-pearl">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-900 mb-8">
              Our Products
            </h1>
            <p className="text-xl lg:text-2xl text-primary-600 leading-relaxed">
              Comprehensive range of industrial rubber rollers, precision engineering components, 
              and custom manufacturing solutions for diverse industrial applications.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 lg:py-32">
        <div className="container-custom">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-3 rounded-full font-medium transition-colors duration-200 ${
                  category === 'All Products'
                    ? 'bg-primary-700 text-white'
                    : 'bg-white text-primary-700 hover:bg-primary-50 border border-primary-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Additional Info */}
          <div className="text-center mt-16">
            <p className="text-primary-600 mb-8">
              All products are custom manufactured to your specifications
            </p>
            <button className="btn-secondary">
              Request Custom Quote
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
