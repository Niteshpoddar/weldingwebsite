import Link from 'next/link'

export default function IndustryCard({ industry }) {
  return (
    <Link href={`/industries#${industry.name.toLowerCase()}`}>
      <div className="card p-6 h-full text-center group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
          {industry.icon}
        </div>

        {/* Industry Info */}
        <h3 className="text-lg font-bold text-primary-900 mb-2 group-hover:text-primary-700 transition-colors">
          {industry.name}
        </h3>

        <p className="text-primary-600 text-sm mb-4 leading-relaxed">
          {industry.description}
        </p>

        {/* Solution Count */}
        <div className="text-xs font-semibold text-primary-500 bg-primary-50 px-3 py-1 rounded-full inline-block">
          {industry.count}
        </div>
      </div>
    </Link>
  )
}
