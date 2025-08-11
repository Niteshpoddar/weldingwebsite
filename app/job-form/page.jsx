import JobForm from '../../components/JobForm'
import PageHero from '../../components/PageHero'

export const metadata = {
  title: 'Job Application - Submit Your Application',
  description: 'Apply for exciting career opportunities at our company. Submit your application and join our team of passionate professionals.',
}

export default function JobFormPage({ searchParams }) {
  const position = searchParams?.position || ''

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-luxury-cream">
      {/* Hero Section */}
      <PageHero 
        title="Job Application"
        subtitle="Ready to join our team? Submit your application below and take the first step towards an exciting career opportunity."
        showCTA={false}
        className="min-h-[40vh]"
      />
      
      <div className="container-custom py-8 lg:py-12">
        <div className="max-w-3xl mx-auto">
          <JobForm position={position} />
        </div>
      </div>
    </div>
  )
}
