'use client';

import { useEffect, useState } from 'react';

export default function AdminTestPage() {
  const [debugInfo, setDebugInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDebugInfo = async () => {
      try {
        const response = await fetch('/api/debug', { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setDebugInfo(data);
        } else {
          console.error('Failed to fetch debug info:', response.status);
        }
      } catch (error) {
        console.error('Error fetching debug info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDebugInfo();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen section-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-primary-700">Loading debug information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen section-bg pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-primary-900 mb-8">Admin Test Page</h1>
        
        <div className="card p-6 mb-6">
          <h2 className="text-xl font-semibold text-primary-800 mb-4">Authentication Status</h2>
          <p className="text-green-600 font-medium">✅ You are successfully authenticated!</p>
          <p className="text-primary-600 mt-2">
            If you can see this page, the middleware is working and your session is valid.
          </p>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold text-primary-800 mb-4">Debug Information</h2>
          {debugInfo ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-primary-700">Environment:</h3>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                  {JSON.stringify(debugInfo.environment, null, 2)}
                </pre>
              </div>
              
              <div>
                <h3 className="font-medium text-primary-700">Cookies:</h3>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                  {JSON.stringify(debugInfo.cookies, null, 2)}
                </pre>
              </div>
            </div>
          ) : (
            <p className="text-red-600">Failed to load debug information</p>
          )}
        </div>
      </div>
    </div>
  );
}
