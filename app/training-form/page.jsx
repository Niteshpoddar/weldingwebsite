import TrainingForm from '../../components/TrainingForm'

export const metadata = {
  title: 'Training Application - Submit Your Application',
  description: 'Apply for exciting training opportunities at our company. Submit your application and join our team of passionate professionals.',
}

export default function TrainingFormPage({ searchParams }) {
  const courseName = searchParams?.courseName || ''

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-luxury-cream">
      {/* Hero Section */}
      <div className="hero-gradient min-h-[40vh] flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold text-primary-900 drop-shadow-lg mb-4 hero-title">
            Training Application
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-primary-700 leading-relaxed mb-6 hero-subtitle">
            Ready to join our team? Submit your application below and take the first step 
            towards an exciting training opportunity.
          </p>
        </div>
      </div>
      
      <div className="container-custom py-8 lg:py-12">
        <div className="max-w-3xl mx-auto">
          <TrainingForm courseName={courseName} />
        </div>
      </div>
    </div>
  )
}
