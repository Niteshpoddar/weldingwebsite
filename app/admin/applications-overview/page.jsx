'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  EyeIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';

export default function ApplicationsOverview() {
  const router = useRouter();
  const [applications, setApplications] = useState({
    jobApplications: [],
    trainingApplications: [],
    contactQueries: []
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/admin/applications', { credentials: 'include' });
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const stats = {
    total: applications.jobApplications.length + applications.trainingApplications.length + applications.contactQueries.length,
    pending: applications.jobApplications.filter(app => app.status === 'pending').length + 
             applications.trainingApplications.filter(app => app.status === 'pending').length + 
             applications.contactQueries.filter(query => query.status === 'pending').length,
    reviewed: applications.jobApplications.filter(app => app.status === 'reviewed').length + 
              applications.trainingApplications.filter(app => app.status === 'reviewed').length + 
              applications.contactQueries.filter(query => query.status === 'reviewed').length,
    approved: applications.jobApplications.filter(app => app.status === 'accepted').length + 
              applications.trainingApplications.filter(app => app.status === 'accepted').length,
    rejected: applications.jobApplications.filter(app => app.status === 'rejected').length + 
              applications.trainingApplications.filter(app => app.status === 'rejected').length,
    resolved: applications.contactQueries.filter(query => query.status === 'resolved').length
  };

  // Get pending applications for review
  const pendingApplications = [
    ...applications.jobApplications.filter(app => app.status === 'pending').map(app => ({ ...app, type: 'job' })),
    ...applications.trainingApplications.filter(app => app.status === 'pending').map(app => ({ ...app, type: 'training' })),
    ...applications.contactQueries.filter(query => query.status === 'pending').map(query => ({ ...query, type: 'contact' }))
  ].sort((a, b) => new Date(b.appliedAt || b.submittedAt) - new Date(a.appliedAt || a.submittedAt));

  // Get approved applications
  const approvedApplications = [
    ...applications.jobApplications.filter(app => app.status === 'accepted').map(app => ({ ...app, type: 'job' })),
    ...applications.trainingApplications.filter(app => app.status === 'accepted').map(app => ({ ...app, type: 'training' }))
  ].sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt));

  if (loading) {
    return (
      <div className="min-h-screen section-bg pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-primary-700">Loading applications overview...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen section-bg pt-20">
      {/* Header */}
      <div className="accent-bg shadow-sm border-b border-primary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="mr-4 p-2 text-primary-600 hover:text-primary-800 hover:bg-primary-50 rounded-lg transition-colors"
              >
                <ArrowLeftIcon className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-primary-900">Applications Overview</h1>
                <p className="text-primary-700">Complete overview of all applications and queries</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-primary-100 p-1 rounded-lg mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-white text-primary-900 shadow-sm'
                : 'text-primary-600 hover:text-primary-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'pending'
                ? 'bg-white text-primary-900 shadow-sm'
                : 'text-primary-600 hover:text-primary-900'
            }`}
          >
            Pending Review ({stats.pending})
          </button>
          <button
            onClick={() => setActiveTab('approved')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'approved'
                ? 'bg-white text-primary-900 shadow-sm'
                : 'text-primary-600 hover:text-primary-900'
            }`}
          >
            Approved ({stats.approved})
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
              {/* Job Applications Card */}
              <div 
                className="card p-4 sm:p-6 text-center hover:shadow-lg transition-all duration-200 transform hover:scale-105 cursor-pointer"
                onClick={() => router.push('/admin/job-applications')}
              >
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full mx-auto mb-3 sm:mb-4">
                  <BriefcaseIcon className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-primary-900 mb-2">{applications.jobApplications.length}</h3>
                <p className="text-sm sm:text-base text-primary-600 mb-2 sm:mb-0">Job Applications</p>
                <div className="mt-2 text-xs sm:text-sm space-y-1 sm:space-y-0">
                  <div className="sm:flex sm:items-center sm:justify-center sm:gap-2">
                    <span className="text-green-600 font-medium">{applications.jobApplications.filter(app => app.status === 'accepted').length} Approved</span>
                    <span className="hidden sm:inline text-primary-400">•</span>
                    <span className="text-yellow-600 font-medium">{applications.jobApplications.filter(app => app.status === 'pending').length} Pending</span>
                  </div>
                </div>
              </div>

              {/* Training Applications Card */}
              <div 
                className="card p-4 sm:p-6 text-center hover:shadow-lg transition-all duration-200 transform hover:scale-105 cursor-pointer"
                onClick={() => router.push('/admin/training-applications')}
              >
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-full mx-auto mb-3 sm:mb-4">
                  <AcademicCapIcon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-primary-900 mb-2">{applications.trainingApplications.length}</h3>
                <p className="text-sm sm:text-base text-primary-600 mb-2 sm:mb-0">Training Applications</p>
                <div className="mt-2 text-xs sm:text-sm space-y-1 sm:space-y-0">
                  <div className="sm:flex sm:items-center sm:justify-center sm:gap-2">
                    <span className="text-green-600 font-medium">{applications.trainingApplications.filter(app => app.status === 'accepted').length} Approved</span>
                    <span className="hidden sm:inline text-primary-400">•</span>
                    <span className="text-yellow-600 font-medium">{applications.trainingApplications.filter(app => app.status === 'pending').length} Pending</span>
                  </div>
                </div>
              </div>

              {/* Contact Queries Card */}
              <div 
                className="card p-4 sm:p-6 text-center hover:shadow-lg transition-all duration-200 transform hover:scale-105 cursor-pointer sm:col-span-2 lg:col-span-1"
                onClick={() => router.push('/admin/contact-queries')}
              >
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full mx-auto mb-3 sm:mb-4">
                  <EnvelopeIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-primary-900 mb-2">{applications.contactQueries.length}</h3>
                <p className="text-sm sm:text-base text-primary-600 mb-2 sm:mb-0">Contact Queries</p>
                <div className="mt-2 text-xs sm:text-sm space-y-1 sm:space-y-0">
                  <div className="sm:flex sm:items-center sm:justify-center sm:gap-2">
                    <span className="text-green-600 font-medium">{applications.contactQueries.filter(query => query.status === 'resolved').length} Resolved</span>
                    <span className="hidden sm:inline text-primary-400">•</span>
                    <span className="text-yellow-600 font-medium">{applications.contactQueries.filter(query => query.status === 'pending').length} Pending</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Breakdown Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Job Applications Status Breakdown */}
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-8 bg-red-500 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-primary-900">Job Applications Status</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-primary-100">
                    <span className="text-primary-700">Pending Review</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full font-medium">
                      {applications.jobApplications.filter(app => app.status === 'pending').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-primary-100">
                    <span className="text-primary-700">Under Review</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
                      {applications.jobApplications.filter(app => app.status === 'reviewed').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-primary-100">
                    <span className="text-primary-700">Approved</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
                      {applications.jobApplications.filter(app => app.status === 'accepted').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-primary-700">Rejected</span>
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded-full font-medium">
                      {applications.jobApplications.filter(app => app.status === 'rejected').length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Training Applications Status Breakdown */}
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-8 bg-yellow-500 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-primary-900">Training Applications Status</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-primary-100">
                    <span className="text-primary-700">Pending Review</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full font-medium">
                      {applications.trainingApplications.filter(app => app.status === 'pending').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-primary-100">
                    <span className="text-primary-700">Under Review</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
                      {applications.trainingApplications.filter(app => app.status === 'reviewed').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-primary-100">
                    <span className="text-primary-700">Approved</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
                      {applications.trainingApplications.filter(app => app.status === 'accepted').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-primary-700">Rejected</span>
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded-full font-medium">
                      {applications.trainingApplications.filter(app => app.status === 'rejected').length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Queries Status Breakdown */}
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-8 bg-blue-500 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-primary-900">Contact Queries Status</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-primary-100">
                    <span className="text-primary-700">Pending Review</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full font-medium">
                      {applications.contactQueries.filter(query => query.status === 'pending').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-primary-100">
                    <span className="text-primary-700">Under Review</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
                      {applications.contactQueries.filter(query => query.status === 'reviewed').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-primary-100">
                    <span className="text-primary-700">Resolved</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
                      {applications.contactQueries.filter(query => query.status === 'resolved').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-primary-700">Rejected</span>
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded-full font-medium">
                      {applications.contactQueries.filter(query => query.status === 'rejected').length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pending Review Tab */}
        {activeTab === 'pending' && (
          <div className="space-y-8">
            {/* Job Applications Pending */}
            {pendingApplications.filter(app => app.type === 'job').length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-8 bg-red-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-primary-900">Pending Job Applications</h2>
                  <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                    {pendingApplications.filter(app => app.type === 'job').length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pendingApplications.filter(app => app.type === 'job').map((app, index) => (
                    <div key={`${app.type}-${app._id}`} className="card p-6 border-l-4 border-yellow-500">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <BriefcaseIcon className="h-5 w-5 text-red-600" />
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full uppercase">
                              {app.type}
                            </span>
                          </div>
                          <h4 className="font-semibold text-primary-900">{app.fullName}</h4>
                          <p className="text-sm text-primary-600">{app.position}</p>
                          <p className="text-xs text-primary-500">
                            {new Date(app.appliedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Link
                          href="/admin/job-applications"
                          className="flex items-center gap-2 px-3 py-2 bg-primary-100 text-primary-700 text-sm rounded-lg hover:bg-primary-200 transition-colors"
                        >
                          <EyeIcon className="h-4 w-4" />
                          Review
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Training Applications Pending */}
            {pendingApplications.filter(app => app.type === 'training').length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-primary-900">Pending Training Applications</h2>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
                    {pendingApplications.filter(app => app.type === 'training').length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pendingApplications.filter(app => app.type === 'training').map((app, index) => (
                    <div key={`${app.type}-${app._id}`} className="card p-6 border-l-4 border-yellow-500">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <AcademicCapIcon className="h-5 w-5 text-yellow-600" />
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full uppercase">
                              {app.type}
                            </span>
                          </div>
                          <h4 className="font-semibold text-primary-900">{app.fullName}</h4>
                          <p className="text-sm text-primary-600">{app.trainingCourse}</p>
                          <p className="text-xs text-primary-500">
                            {new Date(app.appliedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Link
                          href="/admin/training-applications"
                          className="flex items-center gap-2 px-3 py-2 bg-primary-100 text-primary-700 text-sm rounded-lg hover:bg-primary-200 transition-colors"
                        >
                          <EyeIcon className="h-4 w-4" />
                          Review
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Queries Pending */}
            {pendingApplications.filter(app => app.type === 'contact').length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-8 bg-blue-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-primary-900">Pending Contact Queries</h2>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {pendingApplications.filter(app => app.type === 'contact').length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pendingApplications.filter(app => app.type === 'contact').map((app, index) => (
                    <div key={`${app.type}-${app._id}`} className="card p-6 border-l-4 border-yellow-500">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <EnvelopeIcon className="h-5 w-5 text-blue-600" />
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full uppercase">
                              {app.type}
                            </span>
                          </div>
                          <h4 className="font-semibold text-primary-900">{app.name}</h4>
                          <p className="text-sm text-primary-600">{app.email}</p>
                          <p className="text-xs text-primary-500">
                            {new Date(app.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Link
                          href="/admin/contact-queries"
                          className="flex items-center gap-2 px-3 py-2 bg-primary-100 text-primary-700 text-sm rounded-lg hover:bg-primary-200 transition-colors"
                        >
                          <EyeIcon className="h-4 w-4" />
                          Review
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Pending Applications Message */}
            {pendingApplications.length === 0 && (
              <div className="text-center py-12">
                <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-primary-900 mb-2">No Pending Applications</h3>
                <p className="text-primary-700">All applications have been reviewed and processed.</p>
              </div>
            )}
          </div>
        )}

        {/* Approved Applications Tab */}
        {activeTab === 'approved' && (
          <div className="space-y-8">
            {/* Approved Job Applications */}
            {approvedApplications.filter(app => app.type === 'job').length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-8 bg-red-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-primary-900">Approved Job Applications</h2>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    {approvedApplications.filter(app => app.type === 'job').length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {approvedApplications.filter(app => app.type === 'job').map((app, index) => (
                    <div key={`${app.type}-${app._id}`} className="card p-6 border-l-4 border-green-500">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <BriefcaseIcon className="h-5 w-5 text-red-600" />
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full uppercase">
                              {app.type}
                            </span>
                          </div>
                          <h4 className="font-semibold text-primary-900">{app.fullName}</h4>
                          <p className="text-sm text-primary-600">{app.position}</p>
                          <p className="text-xs text-primary-500">
                            {new Date(app.appliedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Link
                          href="/admin/job-applications"
                          className="flex items-center gap-2 px-3 py-2 bg-primary-100 text-primary-700 text-sm rounded-lg hover:bg-primary-200 transition-colors"
                        >
                          <EyeIcon className="h-4 w-4" />
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Approved Training Applications */}
            {approvedApplications.filter(app => app.type === 'training').length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-primary-900">Approved Training Applications</h2>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    {approvedApplications.filter(app => app.type === 'training').length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {approvedApplications.filter(app => app.type === 'training').map((app, index) => (
                    <div key={`${app.type}-${app._id}`} className="card p-6 border-l-4 border-green-500">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <AcademicCapIcon className="h-5 w-5 text-yellow-600" />
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full uppercase">
                              {app.type}
                            </span>
                          </div>
                          <h4 className="font-semibold text-primary-900">{app.fullName}</h4>
                          <p className="text-sm text-primary-600">{app.trainingCourse}</p>
                          <p className="text-xs text-primary-500">
                            {new Date(app.appliedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Link
                          href="/admin/training-applications"
                          className="flex items-center gap-2 px-3 py-2 bg-primary-100 text-primary-700 text-sm rounded-lg hover:bg-primary-200 transition-colors"
                        >
                          <EyeIcon className="h-4 w-4" />
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Approved Applications Message */}
            {approvedApplications.length === 0 && (
              <div className="text-center py-12">
                <ClockIcon className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-primary-900 mb-2">No Approved Applications</h3>
                <p className="text-primary-700">Approved applications will appear here once applications are processed.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
