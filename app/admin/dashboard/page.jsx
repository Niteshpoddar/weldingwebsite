'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  BriefcaseIcon,
  AcademicCapIcon,
  EnvelopeIcon,
  ClipboardDocumentListIcon,
  PlusIcon,
  ClockIcon,
  SparklesIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';

export default function AdminDashboard() {
  const router = useRouter();
  const [recentApplications, setRecentApplications] = useState({
    jobApplications: [],
    trainingApplications: [],
    contactQueries: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentApplications();
  }, []);

  const fetchRecentApplications = async () => {
    try {
      const response = await fetch('/api/admin/applications', { credentials: 'include' });
      if (response.ok) {
        const data = await response.json();
        setRecentApplications(data);
      }
    } catch (error) {
      console.error('Error fetching recent applications:', error);
    } finally {
      setLoading(false);
    }
  };

  // Destructure recent applications for easier access
  const { jobApplications: recentJobApplications, trainingApplications: recentTrainingApplications } = recentApplications;

  return (
    <div className="min-h-screen section-bg">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 hero-gradient">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-900 mb-8 hero-title">
              Admin Dashboard
            </h1>
            <p className="text-xl lg:text-2xl text-primary-700 leading-relaxed hero-subtitle">
              Welcome to your administrative control center. Monitor applications, track statistics, and manage your organization efficiently.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Job Applications Stats */}
          <div 
            className="card p-6 text-center hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:scale-105"
            onClick={() => router.push('/admin/job-applications')}
          >
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
              <BriefcaseIcon className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-primary-900 mb-2">{recentApplications.jobApplications.length}</h3>
            <p className="text-primary-600">Job Applications</p>
          </div>

          {/* Training Applications Stats */}
          <div 
            className="card p-6 text-center hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:scale-105"
            onClick={() => router.push('/admin/training-applications')}
          >
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mx-auto mb-4">
              <AcademicCapIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-primary-900 mb-2">{recentApplications.trainingApplications.length}</h3>
            <p className="text-primary-600">Training Applications</p>
          </div>

          {/* Contact Queries Stats */}
          <div 
            className="card p-6 text-center hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:scale-105"
            onClick={() => router.push('/admin/contact-queries')}
          >
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4">
              <EnvelopeIcon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-primary-900 mb-2">{recentApplications.contactQueries.length}</h3>
            <p className="text-primary-600">Contact Queries</p>
          </div>

          {/* Total Applications Stats */}
          <div 
            className="card p-6 text-center hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:scale-105"
            onClick={() => router.push('/admin/applications-overview')}
          >
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-4">
              <ClipboardDocumentListIcon className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-primary-900 mb-2">
              {recentApplications.jobApplications.length + recentApplications.trainingApplications.length + recentApplications.contactQueries.length}
            </h3>
            <p className="text-primary-600">Total Applications</p>
          </div>
        </div>

        {/* Recent Applications Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Job Applications */}
          <div className="card p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-primary-900">Recent Job Applications</h3>
              <Link href="/admin/job-applications" className="text-red-600 hover:text-red-700 font-medium">
                View All
              </Link>
            </div>
            
            {recentJobApplications.length === 0 ? (
              <p className="text-primary-600 text-center py-4">No recent job applications</p>
            ) : (
              <div className="space-y-4">
                {recentJobApplications.map((app, index) => (
                  <div 
                    key={app._id} 
                    className="p-4 border border-primary-200 rounded-lg bg-white"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-primary-900">{app.fullName}</h4>
                        <p className="text-sm text-primary-600">{app.position}</p>
                        <p className="text-xs text-primary-500">{new Date(app.appliedAt).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        app.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </div>
                    
                    {app.resumeUrl && (
                      <div className="mt-2">
                        <a 
                          href={app.resumeUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded hover:bg-blue-200 transition-colors"
                        >
                          📄 View Resume
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Training Applications */}
          <div className="card p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-primary-900">Recent Training Applications</h3>
              <Link href="/admin/training-applications" className="text-red-600 hover:text-red-700 font-medium">
                View All
              </Link>
            </div>
            
            {recentTrainingApplications.length === 0 ? (
              <p className="text-primary-600 text-center py-4">No recent training applications</p>
            ) : (
              <div className="space-y-4">
                {recentTrainingApplications.map((app, index) => (
                  <div 
                    key={app._id} 
                    className="p-4 border border-primary-200 rounded-lg bg-white"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-primary-900">{app.fullName}</h4>
                        <p className="text-sm text-primary-600">{app.trainingCourse}</p>
                        <p className="text-xs text-primary-500">{new Date(app.appliedAt).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        app.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </div>
                    
                    {app.resumeUrl && (
                      <div className="mt-2">
                        <a 
                          href={app.resumeUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded hover:bg-blue-200 transition-colors"
                        >
                          📄 View Resume
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Contact Queries */}
        <div className="card p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-primary-900">Recent Contact Queries</h3>
            <Link href="/admin/contact-queries" className="text-red-600 hover:text-red-700 font-medium">
              View All
            </Link>
          </div>
          
          {recentApplications.contactQueries.length === 0 ? (
            <p className="text-primary-600 text-center py-4">No recent contact queries</p>
          ) : (
            <div className="space-y-4">
              {recentApplications.contactQueries.slice(0, 3).map((query, index) => (
                <div 
                  key={query._id} 
                  className="p-4 border border-primary-200 rounded-lg bg-white"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-primary-900">{query.fullName}</h4>
                      <p className="text-sm text-primary-600">{query.email}</p>
                      <p className="text-xs text-primary-500">{new Date(query.submittedAt).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      query.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      query.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {query.status.charAt(0).toUpperCase() + query.status.slice(1)}
                    </span>
                  </div>
                  
                  {query.message && (
                    <div className="mt-2">
                      <p className="text-sm text-primary-600 line-clamp-2">
                        {query.message}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="card p-8 mb-8 bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-primary-900 mb-2">Quick Actions</h3>
            <p className="text-primary-600">Manage your business operations efficiently</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Add New Job */}
            <button 
              onClick={() => router.push('/admin/jobs/new')}
              className="group relative overflow-hidden bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-red-400"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-red-400 opacity-20 rounded-full -translate-y-10 translate-x-10 group-hover:scale-110 transition-transform duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-full mx-auto mb-4 group-hover:bg-opacity-30 transition-all duration-300">
                  <PlusIcon className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Add New Job</h4>
                <p className="text-sm text-red-100 opacity-90">Create job openings</p>
              </div>
            </button>

            {/* Add New Training */}
            <button 
              onClick={() => router.push('/admin/trainings/new')}
              className="group relative overflow-hidden bg-gradient-to-br from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-yellow-400"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-400 opacity-20 rounded-full -translate-y-10 translate-x-10 group-hover:scale-110 transition-transform duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-full mx-auto mb-4 group-hover:bg-opacity-30 transition-all duration-300">
                  <PlusIcon className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Add New Training</h4>
                <p className="text-sm text-yellow-100 opacity-90">Create training programs</p>
              </div>
            </button>

            {/* Manage Job Openings */}
            <button 
              onClick={() => router.push('/admin/jobs')}
              className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-blue-400"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-400 opacity-20 rounded-full -translate-y-10 translate-x-10 group-hover:scale-110 transition-transform duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-full mx-auto mb-4 group-hover:bg-opacity-30 transition-all duration-300">
                  <BriefcaseIcon className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Manage Jobs</h4>
                <p className="text-sm text-blue-100 opacity-90">Edit & update openings</p>
              </div>
            </button>

            {/* Manage Training Services */}
            <button 
              onClick={() => router.push('/admin/trainings')}
              className="group relative overflow-hidden bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-purple-400"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-400 opacity-20 rounded-full -translate-y-10 translate-x-10 group-hover:scale-110 transition-transform duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-full mx-auto mb-4 group-hover:bg-opacity-30 transition-all duration-300">
                  <AcademicCapIcon className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Manage Training</h4>
                <p className="text-sm text-purple-100 opacity-90">Edit & update programs</p>
              </div>
            </button>
          </div>

          {/* Quick Stats Row */}
          <div className="mt-8 pt-6 border-t border-primary-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="flex items-center justify-center gap-2 text-primary-600">
                <ClockIcon className="h-4 w-4" />
                <span className="text-sm">Quick access to all functions</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-primary-600">
                <SparklesIcon className="h-4 w-4" />
                <span className="text-sm">Streamlined workflow</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-primary-600">
                <RocketLaunchIcon className="h-4 w-4" />
                <span className="text-sm">Boost productivity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
