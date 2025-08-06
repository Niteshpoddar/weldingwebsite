'use client'

import { useState, useEffect } from 'react'
import DataTable from '../../../components/admin/DataTable'
import DetailModal from '../../../components/admin/DetailModal'

export default function TrainingApplicationsPage() {
  const [applications, setApplications] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'reviewed', label: 'Reviewed' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'cancelled', label: 'Cancelled' }
  ]

  const columns = [
    {
      key: 'name',
      label: 'Name',
      sortable: true
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true
    },
    {
      key: 'company',
      label: 'Company',
      sortable: true
    },
    {
      key: 'course',
      label: 'Course',
      sortable: true
    },
    {
      key: 'trainingType',
      label: 'Training Type',
      sortable: true
    },
    {
      key: 'participants',
      label: 'Participants',
      sortable: false
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          value === 'reviewed' ? 'bg-blue-100 text-blue-800' :
          value === 'confirmed' ? 'bg-green-100 text-green-800' :
          value === 'cancelled' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'createdAt',
      label: 'Submitted',
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }
  ]

  const fetchApplications = async (page = 1, search = '', status = '', sortBy = 'createdAt', sortOrder = 'desc') => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        sortBy,
        sortOrder
      })
      
      if (search) params.append('search', search)
      if (status) params.append('status', status)

      const response = await fetch(`/api/admin/training-applications?${params}`)
      const data = await response.json()

      if (data.success) {
        setApplications(data.data)
        setPagination(data.pagination)
      } else {
        console.error('Failed to fetch applications:', data.error)
      }
    } catch (error) {
      console.error('Error fetching applications:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch('/api/admin/training-applications', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          status: newStatus,
          reviewedBy: 'Admin' // In a real app, get from auth context
        })
      })

      const data = await response.json()
      if (data.success) {
        // Update the application in the list
        setApplications(prev => 
          prev.map(app => 
            app._id === id ? { ...app, status: newStatus } : app
          )
        )
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const handleViewDetails = (application) => {
    setSelectedApplication(application)
    setModalOpen(true)
  }

  useEffect(() => {
    fetchApplications()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading applications...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Training Applications</h1>
        <p className="mt-2 text-gray-600">Manage and review training registration requests.</p>
      </div>

      <DataTable
        data={applications}
        columns={columns}
        pagination={pagination}
        onPageChange={(page) => fetchApplications(page)}
        onSearch={(search, status) => fetchApplications(1, search, status)}
        onSort={(field, order) => fetchApplications(1, '', '', field, order)}
        onStatusChange={handleStatusChange}
        onViewDetails={handleViewDetails}
        statusOptions={statusOptions}
      />

      <DetailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        data={selectedApplication}
        title="Training Application Details"
      />
    </div>
  )
}