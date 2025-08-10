import Link from 'next/link'
import { connectToDatabase } from '../dbconfig/dbconfig'
import Job from '../models/jobmodels'

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
      icon: '💰',
      title: 'Competitive Salary',
      description: 'Market-standard compensation with performance incentives'
    },
    {
      icon: '🏥',
      title: 'Medical Benefits',
      description: 'Health insurance coverage for employees and family'
    },
    {
      icon: '📚',
      title: 'Skill Development',
      description: 'Technical training and skill enhancement opportunities'
    },
    {
      icon: '🏆',
      title: 'Growth Opportunities',
      description: 'Career advancement within growing organization'
    },
    {
      icon: '🏭',
      title: 'Modern Workplace',
      description: 'Well-equipped facility with safety standards'
    },
    {
      icon: '👥',
      title: 'Team Environment',
      description: 'Collaborative work culture with experienced professionals'
    }
  ]

  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary-50 to-luxury-pearl">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-900 mb-8">
              Join Our Team
            </h1>
            <p className="text-xl lg:text-2xl text-primary-600 mb-12 leading-relaxed">
              Build your career with Gujarat's leading industrial roller manufacturer. 
              Join our skilled team and contribute to engineering excellence since 1984.
            </p>
            <Link href="#openings">
              <button className="btn-primary text-lg px-8 py-4">
                View Open Positions
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-32">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-900 mb-6">
              Why Work With Us?
            </h2>
            <p className="text-lg lg:text-xl text-primary-600 max-w-3xl mx-auto">
              Join a company that values technical expertise, quality workmanship, and professional growth in the industrial manufacturing sector.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="card p-8 text-center group hover:shadow-lg transition-all duration-300">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-primary-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section id="openings" className="py-20 lg:py-32 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-900 mb-6">
              Current Openings
            </h2>
            <p className="text-lg lg:text-xl text-primary-600 max-w-3xl mx-auto">
              Explore available positions and find the right opportunity to advance your career in industrial manufacturing.
            </p>
          </div>

          <div className="space-y-8">
            {jobOpenings.map((job) => (
              <div key={job.id} className="card p-8 lg:p-12 hover:shadow-lg transition-shadow duration-300">
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
                      <span className="bg-luxury-pearl px-3 py-1 rounded-full">
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

                <p className="text-primary-600 mb-6 leading-relaxed">
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
          <div className="text-center mt-16 p-12 bg-primary-50 rounded-2xl">
            <h3 className="text-2xl lg:text-3xl font-bold text-primary-900 mb-4">
              Don't see the right position?
            </h3>
            <p className="text-lg text-primary-600 mb-8 max-w-2xl mx-auto">
              We're always looking for skilled professionals to join our manufacturing team. 
              Send us your resume and tell us about your experience and interests.
            </p>
            <div className="space-y-4">
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
