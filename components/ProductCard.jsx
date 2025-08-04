import Link from 'next/link'
import Button from './Button'

export default function ProductCard({ product }) {
  return (
    <div className="card p-6 h-full flex flex-col group hover:shadow-lg transition-all duration-300">
      {/* Product Image */}
      <div className="aspect-video bg-luxury-pearl rounded-lg mb-6 flex items-center justify-center overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
          <span className="text-primary-500 text-6xl font-light">
            {product.category.charAt(0)}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-grow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
            {product.category}
          </span>
          <span className="text-sm font-semibold text-primary-800">
            {product.price}
          </span>
        </div>

        <h3 className="text-xl font-bold text-primary-900 mb-3 group-hover:text-primary-700 transition-colors">
          {product.name}
        </h3>

        <p className="text-primary-600 mb-4 leading-relaxed">
          {product.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-6">
          {product.features.map((feature, index) => (
            <span
              key={index}
              className="text-xs font-medium text-primary-700 bg-primary-100 px-2 py-1 rounded"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-auto">
        <Link href={`/products/${product.id}`}>
          <Button variant="secondary" className="w-full group-hover:bg-primary-50">
            Learn More
          </Button>
        </Link>
      </div>
    </div>
  )
}
