import Link from 'next/link'
import { connectToDatabase } from '../dbconfig/dbconfig'
import Job from '../models/jobmodels'
import { 
  CurrencyDollarIcon, 
  HeartIcon, 
  BookOpenIcon, 
  TrophyIcon, 
  BuildingOffice2Icon, 
  UserGroupIcon 
} from '@heroicons/react/24/outline'

export const metadata = {
  title: 'Careers - Join Bajrang Industries',
  description: 'Join our growing team of skilled professionals in industrial roller manufacturing and engineering. Explore career opportunities in Gujarat.',
}

export default async function CareersPage() {
  await connectToDatabase();

  // Fetch job openings from MongoDB
  const jobsFromDb = await Job.find().lean();

  // Convert MongoDB _id and any Date fields if necessary, e.g.:
  const jobOpenings = jobsFromDb.map(job => ({
    id: job._id.toString(),
    title: job.title,
    department: job.department,
    location: job.location,
    type: job.type,
    experience: job.experience,
    description: job.description,
    requirements: job.requirements,
  }));

  const benefits = [
    {
      icon: CurrencyDollarIcon,
      title: 'Competitive Salary',
      description: 'Market-standard compensation with performance incentives'
    },
    {
      icon: HeartIcon,
      title: 'Medical Benefits',
      description: 'Health insurance coverage for employees and family'
    },
    {
      icon: BookOpenIcon,
      title: 'Skill Development',
      description: 'Technical training and skill enhancement opportunities'
    },
    {
      icon: TrophyIcon,
      title: 'Growth Opportunities',
      description: 'Career advancement within growing organization'
    },
    {
      icon: BuildingOffice2Icon,
      title: 'Modern Workplace',
      description: 'Well-equipped facility with safety standards'
    },
    {
      icon: UserGroupIcon,
      title: 'Team Environment',
      description: 'Collaborative work culture with experienced professionals'
    }
  ]

  return (
    <div className="pt-20 lg:pt-24">
      {/* Breadcrumbs */}
      <div className="container-custom py-4">
        <nav className="flex items-center space-x-2 text-sm text-primary-600 animate-fade-in">
          <Link href="/" className="hover:text-primary-800 transition-colors duration-200">
            Home
          </Link>
          <span>/</span>
          <span className="text-primary-900 font-medium">Careers</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 hero-gradient">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-900 mb-8 hero-title">
              Join Our Team
            </h1>
            <p className="text-xl lg:text-2xl text-primary-700 mb-12 leading-relaxed hero-subtitle">
              Build your career with Gujarat's leading industrial roller manufacturer. 
              Join our skilled team and contribute to engineering excellence since 2004.
            </p>
            <Link href="#openings">
              <button className="btn-primary text-lg px-8 py-4 hero-cta">
                View Open Positions
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-32 section-bg">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-900 mb-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
              Why Work With Us?
            </h2>
            <p className="text-lg lg:text-xl text-primary-700 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
              Join a company that values technical expertise, quality workmanship, and professional growth in the industrial manufacturing sector.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={benefit.title} className="card p-8 text-center group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 transform hover:scale-105 animate-scale-in" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-100 to-yellow-100 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:from-red-200 group-hover:to-yellow-200 transition-all duration-300">
                  <benefit.icon className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-primary-700 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section id="openings" className="py-20 lg:py-32 accent-bg">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-900 mb-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
              Current Openings
            </h2>
            <p className="text-lg lg:text-xl text-primary-700 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
              Explore available positions and find the right opportunity to advance your career in industrial manufacturing.
            </p>
          </div>

          <div className="space-y-8">
            {jobOpenings.map((job, index) => (
              <div key={job.id} className="card p-8 lg:p-12 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slide-up" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
                  <div className="mb-4 lg:mb-0">
                    <h3 className="text-2xl lg:text-3xl font-bold text-primary-900 mb-2">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-primary-600">
                      <span className="bg-primary-100 px-3 py-1 rounded-full">
                        {job.department}
                      </span>
                      <span className="bg-accent-100 px-3 py-1 rounded-full">
                        {job.location}
                      </span>
                      <span className="bg-primary-50 px-3 py-1 rounded-full">
                        {job.type}
                      </span>
                      <span className="bg-primary-50 px-3 py-1 rounded-full">
                        {job.experience}
                      </span>
                    </div>
                  </div>
                  <Link href={`/job-form?position=${encodeURIComponent(job.title)}`}>
                    <button className="btn-secondary">
                      Apply Now
                    </button>
                  </Link>
                </div>

                <p className="text-primary-700 mb-6 leading-relaxed">
                  {job.description}
                </p>

                <div>
                  <h4 className="font-semibold text-primary-900 mb-3">Requirements:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-start text-primary-600">
                        <span className="text-primary-400 mr-2">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* General Application CTA */}
          <div className="text-center mt-16 p-12 bg-gradient-to-br from-blue-50 to-indigo-100 animate-fade-in">
            <h3 className="text-2xl lg:text-3xl font-bold text-primary-900 mb-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
              Don't see the right position?
            </h3>
            <p className="text-lg text-primary-700 mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '400ms' }}>
              We're always looking for skilled professionals to join our manufacturing team. 
              Send us your resume and tell us about your experience and interests.
            </p>
            <div className="space-y-4 animate-slide-up" style={{ animationDelay: '600ms' }}>
              <p className="text-primary-700">
                <strong>Email:</strong> careers@bajrangindustries.com
              </p>
              <Link href="/job-form">
                <button className="btn-primary text-lg px-8 py-4">
                  Submit Your Resume
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
