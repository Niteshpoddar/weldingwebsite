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
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      const response = await fetch('/api/admin/trainings');
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

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this training service?')) return;

    setDeleteLoading(id);
    try {
      const response = await fetch(`/api/admin/trainings/${id}`, {
        method: 'DELETE',
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
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading training services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="mr-4 p-2 text-gray-400 hover:text-gray-600"
              >
                <ArrowLeftIcon className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Training Services</h1>
                <p className="text-gray-600">Manage training and support services</p>
              </div>
            </div>
            <button
              onClick={() => router.push('/admin/trainings/new')}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add New Training
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {trainings.length === 0 ? (
          <div className="text-center py-12">
            <AcademicCapIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No training services yet</h3>
            <p className="text-gray-600 mb-6">Get started by creating your first training service.</p>
            <button
              onClick={() => router.push('/admin/trainings/new')}
              className="flex items-center mx-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add First Training
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trainings.map((training) => (
              <div key={training._id} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {training.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        training.level === 'Operator' ? 'bg-green-100 text-green-800' :
                        training.level === 'Technical' ? 'bg-blue-100 text-blue-800' :
                        training.level === 'Engineering' ? 'bg-purple-100 text-purple-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {training.level}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                        {training.duration}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => router.push(`/admin/trainings/${training._id}/edit`)}
                      className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                      title="Edit training"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(training._id)}
                      disabled={deleteLoading === training._id}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
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

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {training.description}
                </p>

                {training.topics && training.topics.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Key Areas:</h4>
                    <div className="flex flex-wrap gap-1">
                      {training.topics.slice(0, 3).map((topic, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                          {topic}
                        </span>
                      ))}
                      {training.topics.length > 3 && (
                        <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded">
                          +{training.topics.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="text-sm text-gray-500">
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
