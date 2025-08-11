import Link from 'next/link'
import Button from './Button'

export default function ProductCard({ product }) {
  return (
    <div className="card p-6 h-full flex flex-col group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      {/* Product Image */}
      <div className="aspect-video bg-accent-50 rounded-lg mb-6 flex items-center justify-center overflow-hidden group-hover:bg-accent-100 transition-all duration-300">
        <div className="w-full h-full bg-gradient-to-br from-accent-100 to-secondary-200 flex items-center justify-center group-hover:from-accent-200 group-hover:to-secondary-300 transition-all duration-300">
          <span className="text-primary-600 text-6xl font-light group-hover:text-primary-700 transition-colors duration-300">
            {product.category.charAt(0)}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-grow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-primary-700 bg-accent-100 px-3 py-1 rounded-full group-hover:bg-accent-200 transition-colors duration-300">
            {product.category}
          </span>
          <span className="text-sm font-semibold text-primary-800">
            {product.price}
          </span>
        </div>

        <h3 className="text-xl font-bold text-primary-900 mb-3 group-hover:text-primary-700 transition-colors duration-300">
          {product.name}
        </h3>

        <p className="text-primary-700 mb-4 leading-relaxed">
          {product.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-6">
          {product.features.map((feature, index) => (
            <span
              key={index}
              className="text-xs font-medium text-primary-700 bg-accent-100 px-2 py-1 rounded group-hover:bg-accent-200 transition-all duration-300 hover:scale-105"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-auto">
        <Link href={`/products/${product.id}`}>
          <Button variant="secondary" className="w-full group-hover:bg-accent-100 group-hover:border-accent-300">
            Learn More
          </Button>
        </Link>
      </div>
    </div>
  )
}
