'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeftIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function EditTraining() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    level: 'Technical',
    description: '',
    topics: ['']
  });

  useEffect(() => {
    const fetchTraining = async () => {
      try {
        const response = await fetch(`/api/admin/trainings/${params.id}`, { credentials: 'include' });
        if (response.ok) {
          const training = await response.json();
          setFormData(training);
        } else {
          alert('Training not found');
          router.push('/admin/trainings');
        }
      } catch (error) {
        console.error('Error fetching training:', error);
        alert('Error loading training');
        router.push('/admin/trainings');
      } finally {
        setLoading(false);
      }
    };
    fetchTraining();
  }, [params.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTopicChange = (index, value) => {
    const newTopics = [...formData.topics];
    newTopics[index] = value;
    setFormData(prev => ({
      ...prev,
      topics: newTopics
    }));
  };

  const addTopic = () => {
    setFormData(prev => ({
      ...prev,
      topics: [...prev.topics, '']
    }));
  };

  const removeTopic = (index) => {
    if (formData.topics.length > 1) {
      const newTopics = formData.topics.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        topics: newTopics
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Filter out empty topics
      const cleanTopics = formData.topics.filter(topic => topic.trim() !== '');

      const response = await fetch(`/api/admin/trainings/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          topics: cleanTopics
        }),
        credentials: 'include'
      });

      if (response.ok) {
        router.push('/admin/trainings');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to update training');
      }
    } catch (error) {
      console.error('Error updating training:', error);
      alert('Error updating training');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading training...</p>
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
                onClick={() => router.push('/admin/trainings')}
                className="mr-4 p-2 text-gray-400 hover:text-gray-600"
              >
                <ArrowLeftIcon className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Edit Training</h1>
                <p className="text-gray-600">Update training service details</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Training Name */}
            <div className="md:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Training Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="e.g., Installation & Commissioning"
              />
            </div>

            {/* Duration */}
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                Duration *
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="e.g., 1-2 days"
              />
            </div>

            {/* Level */}
            <div>
              <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-2">
                Level *
              </label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="Operator">Operator</option>
                <option value="Technical">Technical</option>
                <option value="Engineering">Engineering</option>
                <option value="Professional">Professional</option>
              </select>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Describe the training service and what participants will learn..."
              />
            </div>

            {/* Topics */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Topics
              </label>
              <div className="space-y-2">
                {formData.topics.map((topic, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => handleTopicChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g., Installation Procedures"
                    />
                    {formData.topics.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTopic(index)}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addTopic}
                  className="flex items-center text-sm text-green-600 hover:text-green-700"
                >
                  <PlusIcon className="h-4 w-4 mr-1" />
                  Add Topic
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.push('/admin/trainings')}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Update Training'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
