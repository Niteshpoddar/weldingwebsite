'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeftIcon,
  UserIcon,
  BriefcaseIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

export default function JobApplications() {
  const router = useRouter();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('/api/admin/applications', { 
          credentials: 'include' 
        });
        if (response.ok) {
          const data = await response.json();
          setApplications(data.jobApplications || []);
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  useEffect(() => {
    // Check if there's a selected application from dashboard
    const urlParams = new URLSearchParams(window.location.search);
    const selectedId = urlParams.get('selected');
    if (selectedId && applications.length > 0) {
      // Find and select the application
      const app = applications.find(app => app._id === selectedId);
      if (app) {
        setSelectedApplication(app);
        setShowDetails(true);
      }
    }
  }, [applications]);

  const selectApplication = (application) => {
    setSelectedApplication(application);
    setShowDetails(true);
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/admin/applications`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'job',
          id: id,
          status: newStatus
        }),
      });

      if (response.ok) {
        // Update local state immediately for instant feedback
        setApplications(prev => 
          prev.map(app => 
            app._id === id ? { ...app, status: newStatus } : app
          )
        );
        
        // Update selected application if it's the one being updated
        if (selectedApplication && selectedApplication._id === id) {
          setSelectedApplication(prev => ({ ...prev, status: newStatus }));
        }
        
        console.log('Status updated successfully');
      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteApplication = async (id) => {
    if (window.confirm('Are you sure you want to delete this job application? This action cannot be undone.')) {
      try {
        const response = await fetch(`/api/admin/applications`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'job',
            id: id
          }),
        });

        if (response.ok) {
          // Refresh the applications list
          fetchApplications();
        } else {
          console.error('Failed to delete application');
        }
      } catch (error) {
        console.error('Error deleting application:', error);
      }
    }
  };

  const sendCustomEmail = async (application) => {
    const emailType = application.status === 'accepted' ? 'acceptance' : 'rejection';
    
    let subject, body;
    
    if (emailType === 'acceptance') {
      subject = `Congratulations! Your Job Application for ${application.position} has been Accepted`;
      body = `Dear ${application.fullName},

We are pleased to inform you that your application for the position of ${application.position} has been accepted!

Our team was impressed with your qualifications and experience. We will be in touch shortly with next steps and onboarding details.

If you have any questions, please don't hesitate to reach out to us.

Best regards,
The HR Team`;
    } else {
      subject = `Update on Your Job Application for ${application.position}`;
      body = `Dear ${application.fullName},

Thank you for your interest in the position of ${application.position} and for taking the time to apply to our company.

After careful consideration, we regret to inform you that we are unable to move forward with your application at this time.

We appreciate your interest in joining our team and wish you the best in your future endeavors.

Best regards,
The HR Team`;
    }

    // Encode subject and body for mailto URL
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    
    // Create mailto URL with pre-filled content
    const mailtoUrl = `mailto:${application.email}?subject=${encodedSubject}&body=${encodedBody}`;
    
    // Open default mail app
    window.open(mailtoUrl);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <ClockIcon className="h-4 w-4" />;
      case 'reviewed': return <CheckCircleIcon className="h-4 w-4" />;
      case 'rejected': return <XCircleIcon className="h-4 w-4" />;
      case 'accepted': return <CheckCircleIcon className="h-4 w-4" />;
      default: return <ClockIcon className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen section-bg flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-primary-700">Loading job applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen section-bg">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 hero-gradient">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-900 mb-8 hero-title">
              Job Applications
            </h1>
            <p className="text-xl lg:text-2xl text-primary-700 leading-relaxed hero-subtitle">
              Review and manage job applications from talented candidates. Track application status and make informed hiring decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Header */}
      <div className="accent-bg shadow-sm border-b border-primary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6 animate-fade-in">
            <div className="flex items-center animate-slide-up" style={{ animationDelay: '200ms' }}>
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="mr-4 p-2 text-primary-400 hover:text-primary-600 transition-colors duration-300"
              >
                <ArrowLeftIcon className="h-6 w-6" />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-primary-900">Job Applications</h2>
                <p className="text-primary-700">Review and manage job applications</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {applications.length === 0 ? (
          <div className="text-center py-12 animate-fade-in">
            <UserIcon className="h-12 w-12 text-red-500 mx-auto mb-4 animate-bounce-gentle" />
            <h3 className="text-lg font-medium text-primary-900 mb-2 animate-slide-up" style={{ animationDelay: '200ms' }}>
              No job applications yet
            </h3>
            <p className="text-primary-700 animate-slide-up" style={{ animationDelay: '400ms' }}>
              Job applications will appear here when candidates apply.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Pending Applications */}
            {applications.filter(app => app.status === 'pending').length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-8 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-primary-900">Pending Applications</h2>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
                    {applications.filter(app => app.status === 'pending').length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {applications.filter(app => app.status === 'pending').map((app, index) => (
                    <div 
                      key={app._id} 
                      className={`card p-6 hover:shadow-lg transition-all duration-300 animate-slide-up cursor-pointer ${
                        selectedApplication?._id === app._id ? 'ring-2 ring-primary-500 bg-primary-50' : ''
                      }`}
                      style={{ animationDelay: `${(index + 1) * 100}ms` }}
                      onClick={() => selectApplication(app)}
                    >
                      <div className="flex flex-col gap-4">
                        {/* Header with Name and Status */}
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <UserIcon className="h-5 w-5 text-primary-500" />
                            <h3 className="text-xl font-semibold text-primary-900">{app.fullName}</h3>
                          </div>
                          
                          {/* Status Dropdown */}
                          <div className="flex items-center gap-2">
                            <select
                              value={app.status}
                              onChange={(e) => updateStatus(app._id, e.target.value)}
                              className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <option value="pending">Pending</option>
                              <option value="reviewed">Reviewed</option>
                              <option value="rejected">Rejected</option>
                              <option value="accepted">Accepted</option>
                            </select>
                          </div>
                        </div>

                        {/* Application Details */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <BriefcaseIcon className="h-4 w-4 text-primary-400" />
                            <span className="text-primary-700 font-medium">Position:</span>
                            <span className="text-primary-600">{app.position}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-primary-400" />
                            <span className="text-primary-700 font-medium">Applied:</span>
                            <span className="text-primary-600">{new Date(app.appliedAt).toLocaleDateString()}</span>
                          </div>

                          {app.email && (
                            <div className="flex items-center gap-2">
                              <EnvelopeIcon className="h-4 w-4 text-primary-400" />
                              <span className="text-primary-700 font-medium">Email:</span>
                              <a 
                                href={`mailto:${app.email}`}
                                className="text-primary-600 hover:text-primary-800 hover:underline transition-colors duration-200 cursor-pointer"
                                title="Click to send email"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {app.email}
                              </a>
                            </div>
                          )}
                          
                          {app.phone && (
                            <div className="flex items-center gap-2">
                              <PhoneIcon className="h-4 w-4 text-primary-400" />
                              <span className="text-primary-700 font-medium">Phone:</span>
                              <span className="text-primary-600">{app.phone}</span>
                            </div>
                          )}

                          {app.experience && (
                            <div className="flex items-center gap-2">
                              <ClockIcon className="h-4 w-4 text-primary-400" />
                              <span className="text-primary-700 font-medium">Experience:</span>
                              <span className="text-primary-600">{app.experience}</span>
                            </div>
                          )}

                          {app.company && (
                            <div className="flex items-center gap-2">
                              <BuildingOfficeIcon className="h-4 w-4 text-primary-400" />
                              <span className="text-primary-700 font-medium">Company:</span>
                              <span className="text-primary-600">{app.company}</span>
                            </div>
                          )}
                        </div>

                        {/* Message Section */}
                        {app.message && (
                          <div className="mt-3">
                            <p className="text-sm font-medium text-primary-700 mb-2">Message:</p>
                            <p className="text-primary-600 text-sm bg-primary-50 p-3 rounded-lg line-clamp-3">
                              {app.message}
                            </p>
                          </div>
                        )}

                        {/* Resume Download */}
                        {app.resumeUrl && (
                          <div className="mt-3">
                            <p className="text-sm font-medium text-primary-700 mb-2">Resume:</p>
                            <a 
                              href={app.resumeUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 text-sm rounded-lg hover:bg-blue-200 transition-colors duration-200"
                              onClick={(e) => e.stopPropagation()}
                            >
                              📄 View Resume
                            </a>
                          </div>
                        )}

                        {/* Status Display */}
                        <div className="flex items-center justify-between pt-2 border-t border-primary-100">
                          <div className="flex items-center gap-2 text-xs text-primary-500">
                            {getStatusIcon(app.status)}
                            <span className="capitalize">{app.status}</span>
                          </div>
                          
                          {/* Delete Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteApplication(app._id);
                            }}
                            className="px-3 py-1 text-xs bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors duration-200 flex items-center gap-1"
                            title="Delete application"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviewed Applications */}
            {applications.filter(app => app.status === 'reviewed').length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-8 bg-blue-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-primary-900">Reviewed Applications</h2>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {applications.filter(app => app.status === 'reviewed').length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {applications.filter(app => app.status === 'reviewed').map((app, index) => (
                    <div 
                      key={app._id} 
                      className={`card p-6 hover:shadow-lg transition-all duration-300 animate-slide-up cursor-pointer ${
                        selectedApplication?._id === app._id ? 'ring-2 ring-primary-500 bg-primary-50' : ''
                      }`}
                      style={{ animationDelay: `${(index + 1) * 100}ms` }}
                      onClick={() => selectApplication(app)}
                    >
                      <div className="flex flex-col gap-4">
                        {/* Header with Name and Status */}
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <UserIcon className="h-5 w-5 text-primary-500" />
                            <h3 className="text-xl font-semibold text-primary-900">{app.fullName}</h3>
                          </div>
                          
                          {/* Status Dropdown */}
                          <div className="flex items-center gap-2">
                            <select
                              value={app.status}
                              onChange={(e) => updateStatus(app._id, e.target.value)}
                              className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <option value="pending">Pending</option>
                              <option value="reviewed">Reviewed</option>
                              <option value="rejected">Rejected</option>
                              <option value="accepted">Accepted</option>
                            </select>
                          </div>
                        </div>

                        {/* Application Details */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <BriefcaseIcon className="h-4 w-4 text-primary-400" />
                            <span className="text-primary-700 font-medium">Position:</span>
                            <span className="text-primary-600">{app.position}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-primary-400" />
                            <span className="text-primary-700 font-medium">Applied:</span>
                            <span className="text-primary-600">{new Date(app.appliedAt).toLocaleDateString()}</span>
                          </div>

                          {app.email && (
                            <div className="flex items-center gap-2">
                              <EnvelopeIcon className="h-4 w-4 text-primary-400" />
                              <span className="text-primary-700 font-medium">Email:</span>
                              <a 
                                href={`mailto:${app.email}`}
                                className="text-primary-600 hover:text-primary-800 hover:underline transition-colors duration-200 cursor-pointer"
                                title="Click to send email"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {app.email}
                              </a>
                            </div>
                          )}
                          
                          {app.phone && (
                            <div className="flex items-center gap-2">
                              <PhoneIcon className="h-4 w-4 text-primary-400" />
                              <span className="text-primary-700 font-medium">Phone:</span>
                              <span className="text-primary-600">{app.phone}</span>
                            </div>
                          )}

                          {app.experience && (
                            <div className="flex items-center gap-2">
                              <ClockIcon className="h-4 w-4 text-primary-400" />
                              <span className="text-primary-700 font-medium">Experience:</span>
                              <span className="text-primary-600">{app.experience}</span>
                            </div>
                          )}

                          {app.company && (
                            <div className="flex items-center gap-2">
                              <BuildingOfficeIcon className="h-4 w-4 text-primary-400" />
                              <span className="text-primary-700 font-medium">Company:</span>
                              <span className="text-primary-600">{app.company}</span>
                            </div>
                          )}
                        </div>

                        {/* Message Section */}
                        {app.message && (
                          <div className="mt-3">
                            <p className="text-sm font-medium text-primary-700 mb-2">Message:</p>
                            <p className="text-primary-600 text-sm bg-primary-50 p-3 rounded-lg line-clamp-3">
                              {app.message}
                            </p>
                          </div>
                        )}

                        {/* Resume Download */}
                        {app.resumeUrl && (
                          <div className="mt-3">
                            <p className="text-sm font-medium text-primary-700 mb-2">Resume:</p>
                            <a 
                              href={app.resumeUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 text-sm rounded-lg hover:bg-blue-200 transition-colors duration-200"
                              onClick={(e) => e.stopPropagation()}
                            >
                              📄 View Resume
                            </a>
                          </div>
                        )}

                        {/* Status Display */}
                        <div className="flex items-center justify-between pt-2 border-t border-primary-100">
                          <div className="flex items-center gap-2 text-xs text-primary-500">
                            {getStatusIcon(app.status)}
                            <span className="capitalize">{app.status}</span>
                          </div>
                          
                          {/* Delete Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteApplication(app._id);
                            }}
                            className="px-3 py-1 text-xs bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors duration-200 flex items-center gap-1"
                            title="Delete application"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Accepted Applications */}
            {applications.filter(app => app.status === 'accepted').length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-8 bg-green-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-primary-900">Accepted Applications</h2>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    {applications.filter(app => app.status === 'accepted').length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {applications.filter(app => app.status === 'accepted').map((app, index) => (
                    <div 
                      key={app._id} 
                      className={`card p-6 hover:shadow-lg transition-all duration-300 animate-slide-up cursor-pointer ${
                        selectedApplication?._id === app._id ? 'ring-2 ring-primary-500 bg-primary-50' : ''
                      }`}
                      style={{ animationDelay: `${(index + 1) * 100}ms` }}
                      onClick={() => selectApplication(app)}
                    >
                      <div className="flex flex-col gap-4">
                        {/* Header with Name and Status */}
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <UserIcon className="h-5 w-5 text-primary-500" />
                            <h3 className="text-xl font-semibold text-primary-900">{app.fullName}</h3>
                          </div>
                          
                          {/* Status Dropdown */}
                          <div className="flex items-center gap-2">
                            <select
                              value={app.status}
                              onChange={(e) => updateStatus(app._id, e.target.value)}
                              className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <option value="pending">Pending</option>
                              <option value="reviewed">Reviewed</option>
                              <option value="rejected">Rejected</option>
                              <option value="accepted">Accepted</option>
                            </select>
                            
                            {/* Custom Email Button for Accepted */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                sendCustomEmail(app);
                              }}
                              className="px-3 py-1 text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg transition-colors duration-200 flex items-center gap-1"
                              title="Send custom email"
                            >
                              📧 Email
                            </button>
                          </div>
                        </div>

                        {/* Application Details */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <BriefcaseIcon className="h-4 w-4 text-primary-400" />
                            <span className="text-primary-700 font-medium">Position:</span>
                            <span className="text-primary-600">{app.position}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-primary-400" />
                            <span className="text-primary-700 font-medium">Applied:</span>
                            <span className="text-primary-600">{new Date(app.appliedAt).toLocaleDateString()}</span>
                          </div>

                          {app.email && (
                            <div className="flex items-center gap-2">
                              <EnvelopeIcon className="h-4 w-4 text-primary-400" />
                              <span className="text-primary-700 font-medium">Email:</span>
                              <a 
                                href={`mailto:${app.email}`}
                                className="text-primary-600 hover:text-primary-800 hover:underline transition-colors duration-200 cursor-pointer"
                                title="Click to send email"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {app.email}
                              </a>
                            </div>
                          )}
                          
                          {app.phone && (
                            <div className="flex items-center gap-2">
                              <PhoneIcon className="h-4 w-4 text-primary-400" />
                              <span className="text-primary-700 font-medium">Phone:</span>
                              <span className="text-primary-600">{app.phone}</span>
                            </div>
                          )}

                          {app.experience && (
                            <div className="flex items-center gap-2">
                              <ClockIcon className="h-4 w-4 text-primary-400" />
                              <span className="text-primary-700 font-medium">Experience:</span>
                              <span className="text-primary-600">{app.experience}</span>
                            </div>
                          )}

                          {app.company && (
                            <div className="flex items-center gap-2">
                              <BuildingOfficeIcon className="h-4 w-4 text-primary-400" />
                              <span className="text-primary-700 font-medium">Company:</span>
                              <span className="text-primary-600">{app.company}</span>
                            </div>
                          )}
                        </div>

                        {/* Message Section */}
                        {app.message && (
                          <div className="mt-3">
                            <p className="text-sm font-medium text-primary-700 mb-2">Message:</p>
                            <p className="text-primary-600 text-sm bg-primary-50 p-3 rounded-lg line-clamp-3">
                              {app.message}
                            </p>
                          </div>
                        )}

                        {/* Resume Download */}
                        {app.resumeUrl && (
                          <div className="mt-3">
                            <p className="text-sm font-medium text-primary-700 mb-2">Resume:</p>
                            <a 
                              href={app.resumeUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 text-sm rounded-lg hover:bg-blue-200 transition-colors duration-200"
                              onClick={(e) => e.stopPropagation()}
                            >
                              📄 View Resume
                            </a>
                          </div>
                        )}

                        {/* Status Display */}
                        <div className="flex items-center justify-between pt-2 border-t border-primary-100">
                          <div className="flex items-center gap-2 text-xs text-primary-500">
                            {getStatusIcon(app.status)}
                            <span className="capitalize">{app.status}</span>
                          </div>
                          
                          {/* Delete Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteApplication(app._id);
                            }}
                            className="px-3 py-1 text-xs bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors duration-200 flex items-center gap-1"
                            title="Delete application"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rejected Applications */}
            {applications.filter(app => app.status === 'rejected').length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-8 bg-red-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-primary-900">Rejected Applications</h2>
                  <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                    {applications.filter(app => app.status === 'rejected').length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {applications.filter(app => app.status === 'rejected').map((app, index) => (
                    <div 
                      key={app._id} 
                      className={`card p-6 hover:shadow-lg transition-all duration-300 animate-slide-up cursor-pointer ${
                        selectedApplication?._id === app._id ? 'ring-2 ring-primary-500 bg-primary-50' : ''
                      }`}
                      style={{ animationDelay: `${(index + 1) * 100}ms` }}
                      onClick={() => selectApplication(app)}
                    >
                      <div className="flex flex-col gap-4">
                        {/* Header with Name and Status */}
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <UserIcon className="h-5 w-5 text-primary-500" />
                            <h3 className="text-xl font-semibold text-primary-900">{app.fullName}</h3>
                          </div>
                          
                          {/* Status Dropdown */}
                          <div className="flex items-center gap-2">
                            <select
                              value={app.status}
                              onChange={(e) => updateStatus(app._id, e.target.value)}
                              className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <option value="pending">Pending</option>
                              <option value="reviewed">Reviewed</option>
                              <option value="rejected">Rejected</option>
                              <option value="accepted">Accepted</option>
                            </select>
                            
                            {/* Custom Email Button for Rejected */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                sendCustomEmail(app);
                              }}
                              className="px-3 py-1 text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg transition-colors duration-200 flex items-center gap-1"
                              title="Send custom email"
                            >
                              📧 Email
                            </button>
                          </div>
                        </div>

                        {/* Application Details */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <BriefcaseIcon className="h-4 w-4 text-primary-400" />
                            <span className="text-primary-700 font-medium">Position:</span>
                            <span className="text-primary-600">{app.position}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-primary-400" />
                            <span className="text-primary-700 font-medium">Applied:</span>
                            <span className="text-primary-600">{new Date(app.appliedAt).toLocaleDateString()}</span>
                          </div>

                          {app.email && (
                            <div className="flex items-center gap-2">
                              <EnvelopeIcon className="h-4 w-4 text-primary-400" />
                              <span className="text-primary-700 font-medium">Email:</span>
                              <a 
                                href={`mailto:${app.email}`}
                                className="text-primary-600 hover:text-primary-800 hover:underline transition-colors duration-200 cursor-pointer"
                                title="Click to send email"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {app.email}
                              </a>
                            </div>
                          )}
                          
                          {app.phone && (
                            <div className="flex items-center gap-2">
                              <PhoneIcon className="h-4 w-4 text-primary-400" />
                              <span className="text-primary-700 font-medium">Phone:</span>
                              <span className="text-primary-600">{app.phone}</span>
                            </div>
                          )}

                          {app.experience && (
                            <div className="flex items-center gap-2">
                              <ClockIcon className="h-4 w-4 text-primary-400" />
                              <span className="text-primary-700 font-medium">Experience:</span>
                              <span className="text-primary-600">{app.experience}</span>
                            </div>
                          )}

                          {app.company && (
                            <div className="flex items-center gap-2">
                              <BuildingOfficeIcon className="h-4 w-4 text-primary-400" />
                              <span className="text-primary-700 font-medium">Company:</span>
                              <span className="text-primary-600">{app.company}</span>
                            </div>
                          )}
                        </div>

                        {/* Message Section */}
                        {app.message && (
                          <div className="mt-3">
                            <p className="text-sm font-medium text-primary-700 mb-2">Message:</p>
                            <p className="text-primary-600 text-sm bg-primary-50 p-3 rounded-lg line-clamp-3">
                              {app.message}
                            </p>
                          </div>
                        )}

                        {/* Resume Download */}
                        {app.resumeUrl && (
                          <div className="mt-3">
                            <p className="text-sm font-medium text-primary-700 mb-2">Resume:</p>
                            <a 
                              href={app.resumeUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 text-sm rounded-lg hover:bg-blue-200 transition-colors duration-200"
                              onClick={(e) => e.stopPropagation()}
                            >
                              📄 View Resume
                            </a>
                          </div>
                        )}

                        {/* Status Display */}
                        <div className="flex items-center justify-between pt-2 border-t border-primary-100">
                          <div className="flex items-center gap-2 text-xs text-primary-500">
                            {getStatusIcon(app.status)}
                            <span className="capitalize">{app.status}</span>
                          </div>
                          
                          {/* Delete Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteApplication(app._id);
                            }}
                            className="px-3 py-1 text-xs bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors duration-200 flex items-center gap-1"
                            title="Delete application"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

