import JobForm from '../../components/JobForm'

export const metadata = {
  title: 'Job Application - Submit Your Application',
  description: 'Apply for exciting career opportunities at our company. Submit your application and join our team of passionate professionals.',
}

export default function JobFormPage({ searchParams }) {
  const position = searchParams?.position || ''

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-luxury-cream">
      <div className="container-custom py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary-900 mb-6">
              Job Application
            </h1>
            <p className="text-lg text-primary-600">
              Ready to join our team? Submit your application below and take the first step 
              towards an exciting career opportunity.
            </p>
          </div>
          
          <JobForm position={position} />
        </div>
      </div>
    </div>
  )
}
