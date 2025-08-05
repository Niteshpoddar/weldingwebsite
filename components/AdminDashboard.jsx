'use client';

import { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  TrashIcon, 
  PencilIcon,
  EyeIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const [data, setData] = useState({ products: [], industries: [], training: [], careers: [] });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  const tabs = [
    { id: 'products', name: 'Products', icon: '🔧' },
    { id: 'industries', name: 'Industries', icon: '🏭' },
    { id: 'training', name: 'Training', icon: '📚' },
    { id: 'careers', name: 'Careers', icon: '💼' }
  ];

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/${activeTab}`);
      const result = await response.json();
      setData(prev => ({ ...prev, [activeTab]: result[activeTab] || result }));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingItem ? 'PUT' : 'POST';
      const url = editingItem 
        ? `/api/${activeTab}/${editingItem._id}`
        : `/api/${activeTab}`;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowForm(false);
        setEditingItem(null);
        setFormData({});
        fetchData();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      const response = await fetch(`/api/${activeTab}/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        fetchData();
      } else {
        alert('Error deleting item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Error deleting item');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({});
    setShowForm(true);
  };

  const renderForm = () => {
    const baseFields = {
      products: ['name', 'description', 'category', 'price', 'sku', 'brand'],
      industries: ['name', 'description', 'icon'],
      training: ['title', 'description', 'category', 'duration', 'price'],
      careers: ['title', 'department', 'location', 'type', 'description', 'contactEmail']
    };

    const fields = baseFields[activeTab] || [];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {editingItem ? 'Edit' : 'Add'} {activeTab.slice(0, -1)}
            </h3>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map(field => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                {field === 'description' || field === 'title' ? (
                  <textarea
                    name={field}
                    value={formData[field] || ''}
                    onChange={(e) => setFormData({...formData, [field]: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    required
                  />
                ) : field === 'price' ? (
                  <input
                    type="number"
                    name={field}
                    value={formData[field] || ''}
                    onChange={(e) => setFormData({...formData, [field]: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="0.01"
                    required
                  />
                ) : field === 'category' ? (
                  <select
                    name={field}
                    value={formData[field] || ''}
                    onChange={(e) => setFormData({...formData, [field]: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select category</option>
                    {activeTab === 'products' && (
                      <>
                        <option value="Welding Equipment">Welding Equipment</option>
                        <option value="Safety Gear">Safety Gear</option>
                        <option value="Consumables">Consumables</option>
                        <option value="Tools">Tools</option>
                        <option value="Machinery">Machinery</option>
                      </>
                    )}
                    {activeTab === 'training' && (
                      <>
                        <option value="Basic Welding">Basic Welding</option>
                        <option value="Advanced Welding">Advanced Welding</option>
                        <option value="Safety Training">Safety Training</option>
                        <option value="Certification">Certification</option>
                        <option value="Specialized Techniques">Specialized Techniques</option>
                      </>
                    )}
                    {activeTab === 'careers' && (
                      <>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Temporary">Temporary</option>
                        <option value="Internship">Internship</option>
                      </>
                    )}
                  </select>
                ) : (
                  <input
                    type="text"
                    name={field}
                    value={formData[field] || ''}
                    onChange={(e) => setFormData({...formData, [field]: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                )}
              </div>
            ))}

            <div className="flex gap-2 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                {editingItem ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderTable = () => {
    const items = data[activeTab] || [];
    
    if (loading) {
      return <div className="text-center py-8">Loading...</div>;
    }

    if (items.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          No {activeTab} found. Click "Add New" to create one.
        </div>
      );
    }

    const getDisplayFields = () => {
      switch (activeTab) {
        case 'products':
          return ['name', 'category', 'price', 'brand', 'inStock'];
        case 'industries':
          return ['name', 'icon', 'featured'];
        case 'training':
          return ['title', 'category', 'duration', 'price'];
        case 'careers':
          return ['title', 'department', 'location', 'type', 'isActive'];
        default:
          return ['name', 'id'];
      }
    };

    const fields = getDisplayFields();

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {fields.map(field => (
                <th key={field} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item, index) => (
              <tr key={item._id || index} className="hover:bg-gray-50">
                {fields.map(field => (
                  <td key={field} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {field === 'price' ? `$${item[field]}` :
                     field === 'inStock' ? (item[field] ? 'Yes' : 'No') :
                     field === 'featured' ? (item[field] ? 'Yes' : 'No') :
                     field === 'isActive' ? (item[field] ? 'Active' : 'Inactive') :
                     field === 'icon' ? item[field] :
                     item[field]}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">Manage your welding website content</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {tabs.find(tab => tab.id === activeTab)?.name}
        </h2>
        <button
          onClick={handleAdd}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add New
        </button>
      </div>

      {/* Table */}
      {renderTable()}

      {/* Form Modal */}
      {showForm && renderForm()}
    </div>
  );
}