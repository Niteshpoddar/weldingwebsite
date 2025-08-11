import Link from 'next/link'
import { 
  BuildingOffice2Icon, 
  WrenchScrewdriverIcon, 
  TruckIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline'

export default function IndustryCard({ industry }) {
  const getIcon = (name) => {
    switch (name.toLowerCase()) {
      case 'structural fabrication':
        return <BuildingOffice2Icon className="w-8 h-8 text-red-600" />
      case 'engineering & machinery':
        return <WrenchScrewdriverIcon className="w-8 h-8 text-red-600" />
      case 'automobile & rail':
        return <TruckIcon className="w-8 h-8 text-red-600" />
      case 'repair & maintenance':
        return <WrenchScrewdriverIcon className="w-8 h-8 text-red-600" />
      case 'general fabrication':
        return <BuildingOfficeIcon className="w-8 h-8 text-red-600" />
      default:
        return <BuildingOffice2Icon className="w-8 h-8 text-red-600" />
    }
  }

  return (
    <Link href={`/industries#${industry.name.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="card p-6 h-full text-center group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 transform hover:scale-105">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-100 to-yellow-100 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:from-red-200 group-hover:to-yellow-200 transition-all duration-300 shadow-md group-hover:shadow-lg">
          {getIcon(industry.name)}
        </div>

        {/* Industry Info */}
        <h3 className="text-lg font-bold text-primary-900 mb-2 group-hover:text-primary-700 transition-colors duration-300">
          {industry.name}
        </h3>

        <p className="text-primary-700 text-sm mb-4 leading-relaxed">
          {industry.description}
        </p>

        {/* Solution Count */}
        <div className="text-xs font-semibold text-primary-600 bg-accent-100 px-3 py-1 rounded-full inline-block group-hover:bg-accent-200 transition-colors duration-300">
          {industry.count}
        </div>
      </div>
    </Link>
  )
}
