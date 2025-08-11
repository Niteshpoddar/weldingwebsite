'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, EnvelopeIcon, PhoneIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

export default function ContactQueriesPage() {
  const router = useRouter();
  const [contactQueries, setContactQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuery, setSelectedQuery] = useState(null);

  useEffect(() => {
    fetchContactQueries();
  }, []);

  const fetchContactQueries = async () => {
    try {
      const response = await fetch('/api/admin/applications', { credentials: 'include' });
      if (response.ok) {
        const data = await response.json();
        setContactQueries(data.contactQueries);
      }
    } catch (error) {
      console.error('Error fetching contact queries:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (queryId, newStatus) => {
    try {
      const response = await fetch('/api/admin/applications', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ type: 'contact', id: queryId, status: newStatus })
      });

      if (response.ok) {
        // Update local state immediately for instant feedback
        setContactQueries(prev => 
          prev.map(query => 
            query._id === queryId ? { ...query, status: newStatus } : query
          )
        );
        
        // Update selected query if it's the one being updated
        if (selectedQuery && selectedQuery._id === queryId) {
          setSelectedQuery(prev => ({ ...prev, status: newStatus }));
        }
        
        console.log(`Status updated successfully to ${newStatus}`);
      } else {
        console.error('Failed to update status');
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating status');
    }
  };

  const deleteQuery = async (queryId) => {
    if (window.confirm('Are you sure you want to delete this contact query? This action cannot be undone.')) {
      try {
        const response = await fetch('/api/admin/applications', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ type: 'contact', id: queryId })
        });

        if (response.ok) {
          // Remove from local state
          setContactQueries(prev => prev.filter(query => query._id !== queryId));
          
          // Clear selected query if it was the deleted one
          if (selectedQuery && selectedQuery._id === queryId) {
            setSelectedQuery(null);
          }
          
          console.log('Query deleted successfully');
        } else {
          console.error('Failed to delete query');
          alert('Failed to delete query');
        }
      } catch (error) {
        console.error('Error deleting query:', error);
        alert('Error deleting query');
      }
    }
  };

  const sendCustomEmail = async (query) => {
    const subject = `Follow-up on Your Inquiry`;
    const body = `Dear ${query.fullName},

Thank you for reaching out to us. We hope this email finds you well.

We wanted to follow up on your recent inquiry and ensure that all your questions have been addressed.

If you need any additional information or have further questions, please don't hesitate to contact us.

We appreciate your interest in our services and look forward to assisting you further.

Best regards,
The Customer Support Team`;

    // Encode subject and body for mailto URL
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    
    // Create mailto URL with pre-filled content
    const mailtoUrl = `mailto:${query.email}?subject=${encodedSubject}&body=${encodedBody}`;
    
    // Open default mail app
    window.open(mailtoUrl);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen section-bg pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-primary-700">Loading contact queries...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen section-bg pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={() => router.back()}
              className="mr-4 p-2 text-primary-600 hover:text-primary-800 hover:bg-primary-50 rounded-lg transition-colors"
            >
              <ArrowLeftIcon className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-primary-900">Contact Queries</h1>
              <p className="text-primary-700">Manage customer inquiries and support requests</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary-600">{contactQueries.length}</p>
            <p className="text-sm text-primary-600">Total Queries</p>
          </div>
        </div>

        {/* Queries List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Queries List */}
          <div className="lg:col-span-1">
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-primary-800 mb-4">All Queries</h2>
              <div className="space-y-3">
                {contactQueries.length > 0 ? (
                  contactQueries.map((query) => (
                    <div
                      key={query._id}
                      onClick={() => setSelectedQuery(query)}
                      className={`p-3 rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${
                        selectedQuery?._id === query._id ? 'bg-primary-50 border border-primary-200' : 'border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{query.fullName}</p>
                          <p className="text-sm text-gray-600 truncate">{query.email}</p>
                          <p className="text-xs text-gray-500">{formatDate(query.submittedAt)}</p>
                        </div>
                        <span className={`ml-2 inline-block px-2 py-1 text-xs rounded-full ${
                          query.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          query.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {query.status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">No contact queries yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Query Details */}
          <div className="lg:col-span-2">
            {selectedQuery ? (
              <div className="card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-primary-800">Query Details</h2>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-block px-3 py-1 text-sm rounded-full ${
                      selectedQuery.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      selectedQuery.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {selectedQuery.status}
                    </span>
                    <select
                      value={selectedQuery.status}
                      onChange={(e) => updateStatus(selectedQuery._id, e.target.value)}
                      className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="resolved">Resolved</option>
                    </select>
                    
                    {/* Custom Email Button for Resolved Queries */}
                    {selectedQuery.status === 'resolved' && (
                      <button
                        onClick={() => sendCustomEmail(selectedQuery)}
                        className="px-3 py-1 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg transition-colors duration-200 flex items-center gap-1"
                        title="Send follow-up email"
                      >
                        📧 Email
                      </button>
                    )}
                    
                    {/* Delete Button */}
                    <button
                      onClick={() => deleteQuery(selectedQuery._id)}
                      className="px-3 py-1 text-sm bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors duration-200 flex items-center gap-1"
                      title="Delete query"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <EnvelopeIcon className="h-5 w-5 text-primary-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">Email</p>
                        <p className="text-gray-900">{selectedQuery.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <PhoneIcon className="h-5 w-5 text-primary-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">Phone</p>
                        <p className="text-gray-900">{selectedQuery.phone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Company Name if available */}
                  {selectedQuery.companyName && (
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <BuildingOfficeIcon className="h-5 w-5 text-primary-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">Company</p>
                        <p className="text-gray-900">{selectedQuery.companyName}</p>
                      </div>
                    </div>
                  )}

                  {/* Message */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Message</h3>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-800 whitespace-pre-wrap">{selectedQuery.message}</p>
                    </div>
                  </div>

                  {/* Timestamp */}
                  <div className="text-sm text-gray-500">
                    Submitted on: {formatDate(selectedQuery.submittedAt)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="card p-6">
                <div className="text-center text-gray-500 py-12">
                  <EnvelopeIcon className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg">Select a query to view details</p>
                  <p className="text-sm">Choose from the list on the left to see full information</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
