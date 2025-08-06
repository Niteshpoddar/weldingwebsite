'use client'

import { useState, useEffect } from 'react'
import { 
  BriefcaseIcon, 
  AcademicCapIcon, 
  EnvelopeIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    jobApplications: { total: 0, pending: 0 },
    trainingApplications: { total: 0, pending: 0 },
    contactMessages: { total: 0, unread: 0 }
  })

  useEffect(() => {
    // Fetch dashboard statistics
    const fetchStats = async () => {
      try {
        const [jobsRes, trainingRes, contactRes] = await Promise.all([
          fetch('/api/admin/job-applications?limit=1'),
          fetch('/api/admin/training-applications?limit=1'),
          fetch('/api/admin/contact-messages?limit=1')
        ])

        const jobsData = await jobsRes.json()
        const trainingData = await trainingRes.json()
        const contactData = await contactRes.json()

        if (jobsData.success && trainingData.success && contactData.success) {
          setStats({
            jobApplications: {
              total: jobsData.pagination.total,
              pending: jobsData.data.filter(app => app.status === 'pending').length
            },
            trainingApplications: {
              total: trainingData.pagination.total,
              pending: trainingData.data.filter(app => app.status === 'pending').length
            },
            contactMessages: {
              total: contactData.pagination.total,
              unread: contactData.data.filter(msg => msg.status === 'unread').length
            }
          })
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error)
      }
    }

    fetchStats()
  }, [])

  const cards = [
    {
      name: 'Job Applications',
      total: stats.jobApplications.total,
      pending: stats.jobApplications.pending,
      icon: BriefcaseIcon,
      href: '/admin/jobs/applications',
      color: 'bg-blue-500'
    },
    {
      name: 'Training Applications',
      total: stats.trainingApplications.total,
      pending: stats.trainingApplications.pending,
      icon: AcademicCapIcon,
      href: '/admin/trainings/applications',
      color: 'bg-green-500'
    },
    {
      name: 'Contact Messages',
      total: stats.contactMessages.total,
      pending: stats.contactMessages.unread,
      icon: EnvelopeIcon,
      href: '/admin/contact/messages',
      color: 'bg-purple-500'
    }
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">Manage job applications, training registrations, and contact messages.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.name}
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <card.icon className={`h-8 w-8 ${card.color} text-white rounded-lg p-1.5`} />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{card.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{card.total}</div>
                      {card.pending > 0 && (
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-yellow-600">
                          <ExclamationTriangleIcon className="self-center flex-shrink-0 h-4 w-4" />
                          <span className="ml-1">{card.pending} pending</span>
                        </div>
                      )}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a
                  href={card.href}
                  className="font-medium text-blue-700 hover:text-blue-900"
                >
                  View all
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <a
              href="/admin/jobs/applications"
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-blue-50 text-blue-700 ring-4 ring-white">
                  <BriefcaseIcon className="h-6 w-6" />
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">Review Job Applications</p>
                <p className="text-sm text-gray-500">View and manage job submissions</p>
              </div>
            </a>

            <a
              href="/admin/trainings/applications"
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-green-50 text-green-700 ring-4 ring-white">
                  <AcademicCapIcon className="h-6 w-6" />
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">Review Training Applications</p>
                <p className="text-sm text-gray-500">Manage training registrations</p>
              </div>
            </a>

            <a
              href="/admin/contact/messages"
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-purple-50 text-purple-700 ring-4 ring-white">
                  <EnvelopeIcon className="h-6 w-6" />
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">Review Contact Messages</p>
                <p className="text-sm text-gray-500">Respond to customer inquiries</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}