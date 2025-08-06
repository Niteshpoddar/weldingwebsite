'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function DetailModal({ isOpen, onClose, data, title }) {
  if (!data) return null

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      reviewed: 'bg-blue-100 text-blue-800',
      shortlisted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      hired: 'bg-green-100 text-green-800',
      confirmed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      unread: 'bg-yellow-100 text-yellow-800',
      read: 'bg-blue-100 text-blue-800',
      replied: 'bg-green-100 text-green-800',
      resolved: 'bg-green-100 text-green-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900 mb-4">
                      {title}
                    </Dialog.Title>
                    
                    <div className="space-y-4">
                      {/* Basic Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Name</label>
                          <p className="mt-1 text-sm text-gray-900">{data.name}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Email</label>
                          <p className="mt-1 text-sm text-gray-900">{data.email}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Phone</label>
                          <p className="mt-1 text-sm text-gray-900">{data.phone}</p>
                        </div>
                        {data.company && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Company</label>
                            <p className="mt-1 text-sm text-gray-900">{data.company}</p>
                          </div>
                        )}
                      </div>

                      {/* Job-specific fields */}
                      {data.position && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Position</label>
                          <p className="mt-1 text-sm text-gray-900">{data.position}</p>
                        </div>
                      )}
                      {data.experience && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Experience</label>
                          <p className="mt-1 text-sm text-gray-900">{data.experience}</p>
                        </div>
                      )}

                      {/* Training-specific fields */}
                      {data.course && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Course</label>
                          <p className="mt-1 text-sm text-gray-900">{data.course}</p>
                        </div>
                      )}
                      {data.trainingType && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Training Type</label>
                          <p className="mt-1 text-sm text-gray-900">{data.trainingType}</p>
                        </div>
                      )}
                      {data.participants && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Participants</label>
                          <p className="mt-1 text-sm text-gray-900">{data.participants}</p>
                        </div>
                      )}

                      {/* Message */}
                      {(data.message || data.coverLetter) && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            {data.coverLetter ? 'Cover Letter' : 'Message'}
                          </label>
                          <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                            {data.coverLetter || data.message}
                          </p>
                        </div>
                      )}

                      {/* Status and Notes */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Status</label>
                          <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(data.status)}`}>
                            {data.status}
                          </span>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Submitted</label>
                          <p className="mt-1 text-sm text-gray-900">{formatDate(data.createdAt)}</p>
                        </div>
                      </div>

                      {/* Admin Notes */}
                      {data.notes && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Admin Notes</label>
                          <p className="mt-1 text-sm text-gray-900">{data.notes}</p>
                        </div>
                      )}

                      {/* Review Information */}
                      {data.reviewedBy && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Reviewed By</label>
                            <p className="mt-1 text-sm text-gray-900">{data.reviewedBy}</p>
                          </div>
                          {data.reviewedAt && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Reviewed At</label>
                              <p className="mt-1 text-sm text-gray-900">{formatDate(data.reviewedAt)}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}