'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  BriefcaseIcon,
  AcademicCapIcon,
  ArrowRightOnRectangleIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({ jobs: 0, trainings: 0 });

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        const [jobsRes, trainingsRes] = await Promise.all([
          fetch('/api/admin/jobs'),
          fetch('/api/admin/trainings')
        ]);
        if (jobsRes.ok && trainingsRes.ok) {
          const jobs = await jobsRes.json();
          const trainings = await trainingsRes.json();
          setStats({ jobs: jobs.length, trainings: trainings.length });
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin-logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const dashboardCards = [
    {
      title: 'Job Postings',
      count: stats.jobs,
      icon: BriefcaseIcon,
      color: 'bg-blue-500',
      href: '/admin/jobs'
    },
    {
      title: 'Training Services',
      count: stats.trainings,
      icon: AcademicCapIcon,
      color: 'bg-green-500',
      href: '/admin/trainings'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Padding at the top to avoid overlap with navbar/logo */}
      <div className="pt-20 pb-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your website content</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {dashboardCards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => router.push(card.href)}
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${card.color}`}>
                  <card.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.count}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => router.push('/admin/jobs/new')}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <BriefcaseIcon className="h-6 w-6 text-blue-500 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Add New Job</p>
                    <p className="text-sm text-gray-600">Create a new job posting</p>
                  </div>
                </div>
                <ArrowRightOnRectangleIcon className="h-5 w-5 text-gray-400" />
              </button>

              <button
                onClick={() => router.push('/admin/trainings/new')}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <AcademicCapIcon className="h-6 w-6 text-green-500 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Add New Training</p>
                    <p className="text-sm text-gray-600">Create a new training service</p>
                  </div>
                </div>
                <ArrowRightOnRectangleIcon className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="text-center text-gray-500 py-8">
              <ChartBarIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No recent activity to display</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
