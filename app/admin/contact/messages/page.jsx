'use client'

import { useState, useEffect } from 'react'
import DataTable from '../../../components/admin/DataTable'
import DetailModal from '../../../components/admin/DetailModal'

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const statusOptions = [
    { value: 'unread', label: 'Unread' },
    { value: 'read', label: 'Read' },
    { value: 'replied', label: 'Replied' },
    { value: 'resolved', label: 'Resolved' }
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
      key: 'message',
      label: 'Message',
      sortable: false,
      render: (value) => (
        <div className="max-w-xs truncate" title={value}>
          {value.length > 50 ? `${value.substring(0, 50)}...` : value}
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'unread' ? 'bg-yellow-100 text-yellow-800' :
          value === 'read' ? 'bg-blue-100 text-blue-800' :
          value === 'replied' ? 'bg-green-100 text-green-800' :
          value === 'resolved' ? 'bg-green-100 text-green-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'createdAt',
      label: 'Received',
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }
  ]

  const fetchMessages = async (page = 1, search = '', status = '', sortBy = 'createdAt', sortOrder = 'desc') => {
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

      const response = await fetch(`/api/admin/contact-messages?${params}`)
      const data = await response.json()

      if (data.success) {
        setMessages(data.data)
        setPagination(data.pagination)
      } else {
        console.error('Failed to fetch messages:', data.error)
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch('/api/admin/contact-messages', {
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
        // Update the message in the list
        setMessages(prev => 
          prev.map(msg => 
            msg._id === id ? { ...msg, status: newStatus } : msg
          )
        )
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const handleViewDetails = (message) => {
    setSelectedMessage(message)
    setModalOpen(true)
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading messages...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
        <p className="mt-2 text-gray-600">Manage and respond to customer inquiries and messages.</p>
      </div>

      <DataTable
        data={messages}
        columns={columns}
        pagination={pagination}
        onPageChange={(page) => fetchMessages(page)}
        onSearch={(search, status) => fetchMessages(1, search, status)}
        onSort={(field, order) => fetchMessages(1, '', '', field, order)}
        onStatusChange={handleStatusChange}
        onViewDetails={handleViewDetails}
        statusOptions={statusOptions}
      />

      <DetailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        data={selectedMessage}
        title="Contact Message Details"
      />
    </div>
  )
}