'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ArrowLeftIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';

export default function JobsManagement() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/admin/jobs', { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setJobs(data);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      setDeleteLoading(id);
      try {
        const response = await fetch(`/api/admin/jobs/${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        if (response.ok) {
          setJobs(jobs.filter(job => job._id !== id));
        } else {
          alert('Failed to delete job');
        }
      } catch (error) {
        console.error('Error deleting job:', error);
        alert('Error deleting job');
      } finally {
        setDeleteLoading(null);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen section-bg flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-primary-700">Loading jobs...</p>
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
              Job Postings Management
            </h1>
            <p className="text-xl lg:text-2xl text-primary-700 leading-relaxed hero-subtitle">
              Manage job openings and career opportunities for your organization. Create, edit, and organize comprehensive job postings.
            </p>
            <div className="flex justify-center mt-8">
              <button
                onClick={() => router.push('/admin/jobs/new')}
                className="flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 hover:scale-105"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add New Job
              </button>
            </div>
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
                <h2 className="text-2xl font-bold text-primary-900">Job Postings</h2>
                <p className="text-primary-700">
                  Manage job openings and career opportunities
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {jobs.length === 0 ? (
          <div className="text-center py-12 animate-fade-in">
            <BriefcaseIcon className="h-12 w-12 text-red-500 mx-auto mb-4 animate-bounce-gentle" />
            <h3 className="text-lg font-medium text-primary-900 mb-2 animate-slide-up" style={{ animationDelay: '200ms' }}>
              No jobs yet
            </h3>
            <p className="text-primary-700 mb-6 animate-slide-up" style={{ animationDelay: '400ms' }}>
              Get started by creating your first job posting.
            </p>
            <button
              onClick={() => router.push('/admin/jobs/new')}
              className="flex items-center mx-auto px-4 py-2 btn-primary hover:scale-105 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: '600ms' }}
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add First Job
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {jobs.map((job, index) => (
              <div key={job._id} className="card p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slide-up" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-primary-900 mb-2">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full">
                        {job.department}
                      </span>
                      <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full">
                        {job.location}
                      </span>
                      <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full">
                        {job.type}
                      </span>
                      <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full">
                        {job.experience}
                      </span>
                    </div>
                    <p className="text-primary-700 mb-4 line-clamp-2">
                      {job.description}
                    </p>
                    <div className="text-sm text-primary-500">
                      Created: {new Date(job.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => router.push(`/admin/jobs/${job._id}/edit`)}
                      className="p-2 text-primary-400 hover:text-primary-600 transition-colors duration-300 hover:scale-110"
                      title="Edit job"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(job._id)}
                      disabled={deleteLoading === job._id}
                      className="p-2 text-primary-400 hover:text-red-600 transition-colors duration-300 hover:scale-110 disabled:opacity-50"
                      title="Delete job"
                    >
                      {deleteLoading === job._id ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600"></div>
                      ) : (
                        <TrashIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
