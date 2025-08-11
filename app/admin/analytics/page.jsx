'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeftIcon,
  UserGroupIcon,
  AcademicCapIcon,
  EnvelopeIcon,
  ChartBarIcon,
  TrendingUpIcon,
  CalendarIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

export default function AnalyticsDashboard() {
  const router = useRouter();
  const [analytics, setAnalytics] = useState({
    totalApplications: 0,
    totalTrainings: 0,
    totalContacts: 0,
    applicationsByStatus: {},
    trainingCourseStats: {},
    monthlyTrends: {},
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30'); // days

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/admin/analytics?days=${timeRange}`, { 
        credentials: 'include' 
      });
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
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

  if (loading) {
    return (
      <div className="min-h-screen section-bg flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-primary-700">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen section-bg">
      {/* Header */}
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
                <h1 className="text-3xl font-bold text-primary-900">Analytics Dashboard</h1>
                <p className="text-primary-700">Comprehensive insights into your website performance</p>
              </div>
            </div>
            
            <div className="animate-slide-up" style={{ animationDelay: '400ms' }}>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="365">Last year</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card p-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary-600">Total Applications</p>
                <p className="text-3xl font-bold text-primary-900">{analytics.totalApplications}</p>
              </div>
              <UserGroupIcon className="h-8 w-8 text-primary-500" />
            </div>
          </div>

          <div className="card p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary-600">Training Applications</p>
                <p className="text-3xl font-bold text-primary-900">{analytics.totalTrainings}</p>
              </div>
              <AcademicCapIcon className="h-8 w-8 text-primary-500" />
            </div>
          </div>

          <div className="card p-6 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary-600">Contact Queries</p>
                <p className="text-3xl font-bold text-primary-900">{analytics.totalContacts}</p>
              </div>
              <EnvelopeIcon className="h-8 w-8 text-primary-500" />
            </div>
          </div>

          <div className="card p-6 animate-slide-up" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary-600">Conversion Rate</p>
                <p className="text-3xl font-bold text-primary-900">
                  {analytics.totalApplications > 0 
                    ? Math.round((analytics.applicationsByStatus.accepted || 0) / analytics.totalApplications * 100)
                    : 0}%
                </p>
              </div>
              <TrendingUpIcon className="h-8 w-8 text-primary-500" />
            </div>
          </div>
        </div>

        {/* Charts and Detailed Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Application Status Distribution */}
          <div className="card p-6 animate-slide-up" style={{ animationDelay: '500ms' }}>
            <h3 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
              <ChartBarIcon className="h-6 w-6" />
              Application Status Distribution
            </h3>
            <div className="space-y-3">
              {Object.entries(analytics.applicationsByStatus || {}).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  </div>
                  <span className="text-lg font-semibold text-primary-900">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Training Courses */}
          <div className="card p-6 animate-slide-up" style={{ animationDelay: '600ms' }}>
            <h3 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
              <AcademicCapIcon className="h-6 w-6" />
              Popular Training Courses
            </h3>
            <div className="space-y-3">
              {Object.entries(analytics.trainingCourseStats || {})
                .sort(([,a], [,b]) => b - a)
                .slice(0, 5)
                .map(([course, count]) => (
                  <div key={course} className="flex items-center justify-between">
                    <span className="text-primary-700">{course}</span>
                    <span className="text-lg font-semibold text-primary-900">{count}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card p-6 mt-8 animate-slide-up" style={{ animationDelay: '700ms' }}>
          <h3 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
            <CalendarIcon className="h-6 w-6" />
            Recent Activity
          </h3>
          <div className="space-y-4">
            {analytics.recentActivity?.slice(0, 10).map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-primary-50 rounded-lg">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-primary-900 font-medium">{activity.description}</p>
                  <p className="text-sm text-primary-600">{activity.timestamp}</p>
                </div>
                <span className="text-xs text-primary-500">{activity.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
