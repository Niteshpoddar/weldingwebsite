'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  ArrowLeftIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

export default function TrainingsManagement() {
  const router = useRouter();
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await fetch('/api/admin/trainings', { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setTrainings(data);
        }
      } catch (error) {
        console.error('Error fetching trainings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrainings();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this training?')) {
      setDeleteLoading(id);
      try {
        const response = await fetch(`/api/admin/trainings/${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        if (response.ok) {
          setTrainings(trainings.filter(training => training._id !== id));
        } else {
          alert('Failed to delete training');
        }
      } catch (error) {
        console.error('Error deleting training:', error);
        alert('Error deleting training');
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
          <p className="mt-4 text-primary-700">Loading training services...</p>
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
              Training Services Management
            </h1>
            <p className="text-xl lg:text-2xl text-primary-700 leading-relaxed hero-subtitle">
              Manage training and support services for your organization. Create, edit, and organize comprehensive training programs.
            </p>
            <div className="flex justify-center mt-8">
              <button
                onClick={() => router.push('/admin/trainings/new')}
                className="flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 hover:scale-105"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add New Training
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
                <h2 className="text-2xl font-bold text-primary-900">Training Services</h2>
                <p className="text-primary-700">Manage training and support services</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {trainings.length === 0 ? (
          <div className="text-center py-12 animate-fade-in">
            <AcademicCapIcon className="h-12 w-12 text-red-500 mx-auto mb-4 animate-bounce-gentle" />
            <h3 className="text-lg font-medium text-primary-900 mb-2 animate-slide-up" style={{ animationDelay: '200ms' }}>
              No training services yet
            </h3>
            <p className="text-primary-700 mb-6 animate-slide-up" style={{ animationDelay: '400ms' }}>
              Get started by creating your first training service.
            </p>
            <button
              onClick={() => router.push('/admin/trainings/new')}
              className="flex items-center mx-auto px-4 py-2 btn-primary hover:scale-105 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: '600ms' }}
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add First Training
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trainings.map((training, index) => (
              <div key={training._id} className="card p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slide-up" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-primary-900 mb-2">
                      {training.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        training.level === 'Operator' ? 'bg-primary-100 text-primary-800' :
                        training.level === 'Technical' ? 'bg-primary-100 text-primary-800' :
                        training.level === 'Engineering' ? 'bg-primary-100 text-primary-800' :
                        'bg-primary-100 text-primary-800'
                      }`}>
                        {training.level}
                      </span>
                      <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full">
                        {training.duration}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => router.push(`/admin/trainings/${training._id}/edit`)}
                      className="p-2 text-primary-400 hover:text-primary-600 transition-colors duration-300 hover:scale-110"
                      title="Edit training"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(training._id)}
                      disabled={deleteLoading === training._id}
                      className="p-2 text-primary-400 hover:text-red-600 transition-colors duration-300 hover:scale-110 disabled:opacity-50"
                      title="Delete training"
                    >
                      {deleteLoading === training._id ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600"></div>
                      ) : (
                        <TrashIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-primary-700 mb-4 line-clamp-3">
                  {training.description}
                </p>

                {training.topics && training.topics.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-primary-900 mb-2">Key Areas:</h4>
                    <div className="flex flex-wrap gap-1">
                      {training.topics.slice(0, 3).map((topic, index) => (
                        <span key={index} className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded">
                          {topic}
                        </span>
                      ))}
                      {training.topics.length > 3 && (
                        <span className="px-2 py-1 bg-primary-50 text-primary-600 text-xs rounded">
                          +{training.topics.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="text-sm text-primary-500">
                  Created: {new Date(training.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
