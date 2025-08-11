'use client'

import { useState } from 'react'
import Button from './Button'

export default function CloudinaryTest() {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      // Validate file type - PDF only for better compatibility
      const allowedTypes = ['application/pdf']
      if (!allowedTypes.includes(selectedFile.type)) {
        setError('Please upload a PDF document only')
        return
      }
      // Validate file size (5MB max)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB')
        return
      }
      setFile(selectedFile)
      setError('')
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first')
      return
    }

    setUploading(true)
    setError('')
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/resume', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        setResult(data)
      } else {
        throw new Error(data.error || 'Upload failed')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Cloudinary Resume Upload Test</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Resume File
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {file && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-green-700">
              <strong>Selected:</strong> {file.name}
            </p>
            <p className="text-xs text-green-600">
              Size: {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <Button
          onClick={handleUpload}
          disabled={!file || uploading}
          loading={uploading}
          className="w-full"
        >
          {uploading ? 'Uploading...' : 'Upload to Cloudinary'}
        </Button>

        {result && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h3 className="font-semibold text-blue-900 mb-2">Upload Successful!</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Cloudinary ID:</strong> {result.cloudinaryId}</p>
              <p><strong>Filename:</strong> {result.filename}</p>
              <p><strong>URL:</strong></p>
              <a 
                href={result.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 break-all"
              >
                {result.url}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
